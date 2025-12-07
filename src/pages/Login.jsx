// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as apiLogin } from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, loading, login } = useAuth(); // Get user, loading, and login from context

  // Check if user is already logged in *when this component mounts*
  useEffect(() => {
    console.log("Login: Component mounted. User:", user, "Loading:", loading); // Debug log
    // If user exists and loading is finished, redirect based on role
    if (!loading && user) {
      console.log("Login: User exists in context, redirecting based on role..."); // Debug log
      if (user.role === 'Admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/buildings', { replace: true });
      }
    }
  }, [user, loading, navigate]); // Depend on user, loading, and navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login: Submitting login request for:", username); // Debug log
    try {
      const userData = await apiLogin(username, password);
      console.log("Login: API login successful, received user ", userData); // Debug log
      login(userData); // This calls the login function in AuthContext
      // Navigation handled by login function in AuthContext based on role
    } catch (err) {
      console.error("Login: Login error:", err.message); // Debug log
      setError(err.message);
    }
  };

  // If still loading context, show a loader
  if (loading) {
    console.log("Login: Context still loading..."); // Debug log
    return <div className="text-center mt-10">Loading...</div>;
  }

  // If user is already logged in (and loading is false), the useEffect should have redirected.
  // This render block is for when the user is *not* logged in.
  console.log("Login: Rendering login form. User:", user, "Loading:", loading); // Debug log

  return (
    <div className="full-screen bg-dark flex items-center justify-center">
      <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-xl">
        <div className="flex justify-center mb-6">
          {/* Use a simple SVG or image for the logo */}
          <div className="text-center">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4">
              <path d="M30 10C18.9543 10 10 18.9543 10 30C10 41.0457 18.9543 50 30 50C41.0457 50 50 41.0457 50 30C50 18.9543 41.0457 10 30 10ZM30 15C37.732 15 44 21.268 44 30C44 38.732 37.732 45 30 45C22.268 45 16 38.732 16 30C16 21.268 22.268 15 30 15Z" fill="#00BFA5"/>
              <path d="M30 20C35.5228 20 40 24.4772 40 30C40 35.5228 35.5228 40 30 40C24.4772 40 20 35.5228 20 30C20 24.4772 24.4772 20 30 20Z" fill="#00BFA5"/>
              <path d="M30 25C32.7614 25 35 27.2386 35 30C35 32.7614 32.7614 35 30 35C27.2386 35 25 32.7614 25 30C25 27.2386 27.2386 25 30 25Z" fill="#00BFA5"/>
            </svg>
            <h2 className="text-2xl font-bold">Rally Technician</h2>
          </div>
        </div>

        {error && <div className="mb-4 p-2 bg-red-600 text-white rounded">{error}</div>}

        <form onSubmit={handleSubmit}>
          <Input
            label="Username / Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username or email"
            required
            className="input-mockup"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="input-mockup"
          />
          <Button type="submit" className="btn-mockup w-full mt-4">Sign In</Button>
        </form>

        <div className="mt-4 text-center text-sm">
          <a href="#" className="text-primary hover:underline">Forgot Password?</a>
        </div>
        <div className="mt-2 text-center text-sm">
          Don't have an account? <Link to="/register" className="text-primary hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;