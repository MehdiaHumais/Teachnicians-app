import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../services/api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Technician');
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Access login function to auto-login after registration

  const generatePassword = () => {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Call the register API function
      const userData = { name, email, passwordHash: password, role, isActive };
      const newUser = await registerUser(userData);

      setSuccess('Registration successful! Logging you in...');

      // Auto-login the user after successful registration
      login(newUser); // Pass the new user object (without passwordHash)

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="full-screen bg-dark flex items-center justify-center">
      <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-xl">
        <div className="flex justify-center mb-6">
          <h2 className="text-2xl font-bold">Add User</h2>
        </div>

        {error && <div className="mb-4 p-2 bg-red-600 text-white rounded">{error}</div>}
        {success && <div className="mb-4 p-2 bg-green-600 text-white rounded">{success}</div>}

        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
            required
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="flex gap-2">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="flex-grow"
              />
              <Button onClick={generatePassword} variant="outline" className="btn-mockup-outline">Generate</Button>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between">
              <label className="block text-sm font-medium mb-1">Role</label>
              <label className="block text-sm font-medium mb-1">Active</label>
            </div>
            <div className="flex gap-2">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Technician">Field Technician</option>
                <option value="Admin">Admin</option>
              </select>
              <div className="flex items-center">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => setIsActive(!isActive)}
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
          <Button type="submit" className="btn-mockup w-full mt-4">Add</Button>
        </form>

        <div className="mt-4 text-center text-sm">
          Already have an account? <Link to="/" className="text-primary hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;