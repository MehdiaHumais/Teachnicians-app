// src/pages/Register.jsx
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
  const { login } = useAuth(); // Get the login function from context to auto-login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
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
      setError(err.message || 'An error occurred during registration.');
    }
  };

  return (
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
        </div>
      </div>
    </div>
  );
};

export default Register;