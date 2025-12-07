import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
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
      navigate('/admin');
    } else {
      navigate('/buildings');
    }
  };

  const logout = () => {
    console.log("AuthContext: Logout function called"); // Debug log
    setUser(null);
    localStorage.removeItem('user');
    console.log("AuthContext: Cleared user state and localStorage. Navigating to /"); // Debug log
    navigate('/', { replace: true }); // Redirect to login
  };

  // Provide the context value
  console.log("AuthProvider: Rendering children. Current user:", user, "Loading:", loading); // Debug log
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};