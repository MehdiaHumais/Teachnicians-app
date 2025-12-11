<<<<<<< HEAD
=======
// src/pages/Login.jsx
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as apiLogin } from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Login = () => {
<<<<<<< HEAD
  const [email, setEmail] = useState(''); // Changed from username to email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, loading, login } = useAuth();

  useEffect(() => {
    if (!loading && user) {
=======
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
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1
      if (user.role === 'Admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/buildings', { replace: true });
      }
    }
<<<<<<< HEAD
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      // Pass email instead of username to apiLogin
      const userData = await apiLogin(email, password); 
      login(userData);
    } catch (err) {
=======
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
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1
      setError(err.message);
    }
  };

<<<<<<< HEAD
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0B181C] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <svg
            className="w-16 h-16 text-[#00BFA5] mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8.111 16.556A5.5 5.5 0 0112 15c1.47 0 2.82.573 3.889 1.556M9.667 13.556A9.5 9.5 0 0112 12c.98 0 1.9.24 2.778.667"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 18.5a.5.5 0 100-1 .5.5 0 000 1z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4.444 12.556A13.5 13.5 0 0112 9c2.6 0 5.02.74 7.056 2.056"
            ></path>
          </svg>
          <h1 className="text-white text-4xl font-bold tracking-wider">RALLY</h1>
        </div>

        {error && <div className="mb-4 p-3 bg-red-500 text-white rounded-lg text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <Input
              id="email" // Changed id to email
              type="email" // Changed type to email
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Changed from setUsername to setEmail
              placeholder="Email" // Changed placeholder
              required
              className="bg-transparent border-b-2 border-gray-600 text-white w-full py-2 px-1 leading-tight focus:outline-none focus:border-teal-500"
            />
          </div>
          <div className="mb-8">
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="bg-transparent border-b-2 border-gray-600 text-white w-full py-2 px-1 leading-tight focus:outline-none focus:border-teal-500"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#00BFA5] text-black font-bold py-3 rounded-lg hover:bg-teal-400 transition-colors"
          >
            LOGIN
          </Button>
        </form>
        
        <div className="mt-4 text-center">
          <Link to="/register" className="inline-block w-full bg-transparent border-2 border-[#00BFA5] text-[#00BFA5] font-bold py-3 rounded-lg hover:bg-[#00BFA5] hover:text-black transition-colors">
            REGISTER
          </Link>
=======
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
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1
        </div>
      </div>
    </div>
  );
};

export default Login;