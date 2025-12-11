import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient'; // Import supabase client

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      // Check for an active Supabase session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Error getting session:", sessionError.message);
        setUser(null);
        setLoading(false);
        return;
      }

      if (session && session.user) {
        // Fetch user profile from the 'profiles' table
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('username, role, is_active') // Select relevant profile data
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError.message);
          setUser(null);
        } else if (profile && profile.is_active) {
          // Combine auth user data with profile data
          setUser({
            id: session.user.id,
            email: session.user.email,
            username: profile.username,
            role: profile.role,
            isActive: profile.is_active,
          });
        } else {
            // Profile found but inactive, or no profile found after session
            await supabase.auth.signOut(); // Log out the user if profile inactive/not found
            setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    // Listen for auth state changes (login, logout, token refresh)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Supabase Auth State Change:", event, session);
      // When a user logs in (e.g., via email confirmation link), reload their profile
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
        loadUser();
      }
    });

    loadUser(); // Initial load

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);


  const login = async () => {
    // Fetch fresh session and profile after successful login
    const { data: { user: authUser }, error: sessionError } = await supabase.auth.getUser();

    if (sessionError || !authUser) {
        throw new Error(sessionError?.message || 'Failed to retrieve user session after login.');
    }

    let profile = null;
    let profileError = null;
    // Retry fetching the profile to account for potential replication delay after sign-up trigger.
    for (let i = 0; i < 3; i++) {
        const { data, error } = await supabase
            .from('profiles')
            .select('username, role, is_active')
            .eq('id', authUser.id)
            .single();
        
        if (data) {
            profile = data;
            profileError = null;
            break;
        }
        profileError = error;
        await new Promise(res => setTimeout(res, 500)); // Wait 500ms before retrying
    }

    if (profileError || !profile) {
      throw new Error(`Failed to fetch user profile: ${profileError?.message || 'Profile not found.'}`);
    }

    if (!profile.is_active) {
        await supabase.auth.signOut();
        throw new Error('User account is inactive.');
    }

    const fullUserData = {
      id: authUser.id,
      email: authUser.email,
      username: profile.username,
      role: profile.role,
      isActive: profile.is_active,
    };

    setUser(fullUserData);
    localStorage.setItem('user', JSON.stringify(fullUserData)); // Store full user data
    if (fullUserData.role === 'Admin') {
      navigate('/admin');
    } else {
      navigate('/buildings');
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    }
    setUser(null);
    localStorage.removeItem('user');
    navigate('/', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};