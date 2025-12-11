<<<<<<< HEAD
=======
// src/pages/Register.jsx
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser as apiRegisterUser } from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Technician'); // Default role
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
<<<<<<< HEAD
  const { login } = useAuth();
=======
  const { login } = useAuth(); // Get the login function from context to auto-login
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
<<<<<<< HEAD
      const userData = { username, email, password, role };
      const sessionData = await apiRegisterUser(userData);
      
      // If email confirmation is disabled, a session is returned.
      if (sessionData && sessionData.session) {
        setSuccess('Registration successful! Logging you in...');
        // The login function from AuthContext will handle setting the user and navigating.
        await login();
      } else {
        // If email confirmation is enabled, no session is returned.
        setSuccess('Registration successful! Please check your email to confirm your account.');
        setTimeout(() => {
          navigate('/'); // Redirect to login page
        }, 3000);
      }
    } catch (err) {
=======
      // Prepare user data object (API expects passwordHash)
      const userData = { username, email, passwordHash: password, role };
      console.log("Register: Calling API register with ", userData); // Debug log

      // Call the register API function
      const newUser = await apiRegisterUser(userData);
      console.log("Register: API register successful, received user ", newUser); // Debug log

      setSuccess('Registration successful! Logging you in...');

      // Auto-login the user after successful registration using the AuthContext's login function
      // This will set the user in state and localStorage, and navigate based on role
      login(newUser); // Pass the new user object (without passwordHash)

      // Note: The navigation after login is handled by the login function in AuthContext

    } catch (err) {
      console.error("Register: Registration error:", err); // Debug log
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1
      setError(err.message || 'An error occurred during registration.');
    }
  };

  return (
<<<<<<< HEAD
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
        {success && <div className="mb-4 p-3 bg-green-500 text-white rounded-lg text-center">{success}</div>}

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="bg-transparent border-b-2 border-gray-600 text-white w-full py-2 px-1 leading-tight focus:outline-none focus:border-teal-500"
            />
          </div>
          <div className="mb-6">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="bg-transparent border-b-2 border-gray-600 text-white w-full py-2 px-1 leading-tight focus:outline-none focus:border-teal-500"
            />
          </div>
          <div className="mb-6">
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
          <div className="mb-8">
            <label htmlFor="role" className="block text-gray-400 text-sm font-bold mb-2">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-transparent border-b-2 border-gray-600 text-white w-full py-2 px-1 leading-tight focus:outline-none focus:border-teal-500"
            >
              <option value="Technician" className="bg-[#0B181C] text-white">Field Technician</option>
              <option value="Admin" className="bg-[#0B181C] text-white">Admin</option>
            </select>
          </div>
          <Button
            type="submit"
            className="w-full bg-[#00BFA5] text-black font-bold py-3 rounded-lg hover:bg-teal-400 transition-colors"
          >
            REGISTER
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/" className="inline-block w-full bg-transparent border-2 border-gray-600 text-gray-400 font-bold py-3 rounded-lg hover:bg-gray-700 transition-colors">
            Already have an account? Login
          </Link>
=======
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-xl">
        <div className="flex justify-center mb-6">
          {/* <img src="/logo.svg" alt="Logo" className="h-12 w-auto" /> */}
          <h2 className="text-2xl font-bold">Register</h2>
        </div>

        {error && <div className="mb-4 p-2 bg-red-600 text-white rounded">{error}</div>}
        {success && <div className="mb-4 p-2 bg-green-600 text-white rounded">{success}</div>}

        <form onSubmit={handleSubmit}>
          <Input
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Technician">Field Technician</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <Button type="submit" className="btn-mockup w-full mt-4">Register</Button>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account? <Link to="/" className="text-primary hover:underline">Login</Link>
>>>>>>> 09a52b8c2c40d6e8151a6567a884b0bda17d4ca1
        </div>
      </div>
    </div>
  );
};

export default Register;