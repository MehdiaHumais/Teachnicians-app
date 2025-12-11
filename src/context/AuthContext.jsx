import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { supabase } from '../services/supabaseClient'; // Import supabase client
=======
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
<<<<<<< HEAD
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
=======
  const [user, setUser] = useState(null); // Initial state is null
  const [loading, setLoading] = useState(true); // Initial state is loading
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    console.log("AuthProvider: Effect started. Loading:", loading); // Debug log
    const savedUser = localStorage.getItem('user');
    console.log("AuthProvider: Retrieved from localStorage:", savedUser); // Debug log

    const loadUser = async () => {
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          console.log("AuthProvider: Parsed saved user ", userData); // Debug log
          setUser(userData);
          console.log("AuthProvider: Set user state to:", userData); // Debug log

          // Redirect based on role *after* user state is set
          // Using setTimeout to ensure navigation happens after initial render settles
          setTimeout(() => {
            console.log("AuthProvider: Timeout executing. User data from localStorage:", userData); // Debug log
            if (userData.role === 'Admin') {
              console.log("AuthProvider: Navigating to /admin..."); // Debug log
              navigate('/admin', { replace: true });
            } else {
              console.log("AuthProvider: Navigating to /buildings..."); // Debug log
              navigate('/buildings', { replace: true });
            }
          }, 0);
        } catch (e) {
          console.error("AuthProvider: Error parsing user from localStorage:", e);
          // If parsing fails, clear the invalid entry
          localStorage.removeItem('user');
          setUser(null); // Ensure user is null
          console.log("AuthProvider: Cleared invalid localStorage user, set state to null."); // Debug log
        }
      } else {
          console.log("AuthProvider: No user found in localStorage, user state remains null."); // Debug log
          setUser(null); // Ensure user is null if not found
      }
      // Crucially, set loading to false AFTER the check (this is what prevents the route guards from staying in the 'loading' state)
      console.log("AuthProvider: Setting loading to false. Final user state:", user); // Debug log
      setLoading(false);
    };

    loadUser();
  }, [navigate]); // Add navigate to dependency array

  const login = (userData) => {
    console.log("AuthContext: Login function called with:", userData); // Debug log
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log("AuthContext: User set in state and localStorage. Navigating based on role..."); // Debug log
    // Navigate based on role after login
    if (userData.role === 'Admin') {
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1
      navigate('/admin');
    } else {
      navigate('/buildings');
    }
  };

<<<<<<< HEAD
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    }
    setUser(null);
    localStorage.removeItem('user');
    navigate('/', { replace: true });
  };

=======
  const logout = () => {
    console.log("AuthContext: Logout function called"); // Debug log
    setUser(null);
    localStorage.removeItem('user');
    console.log("AuthContext: Cleared user state and localStorage. Navigating to /"); // Debug log
    navigate('/', { replace: true }); // Redirect to login
  };

  // Provide the context value
  console.log("AuthProvider: Rendering children. Current user:", user, "Loading:", loading); // Debug log
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};