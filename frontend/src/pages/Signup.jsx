import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import toast from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', address: '', contactNumber: ''
  });

  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password' || name === 'confirmPassword') {
      setPasswordMatch(name === 'password'
        ? value === formData.confirmPassword
        : formData.password === value
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordMatch) {
      alert('Passwords do not match');
      return;
    }

    const { confirmPassword, ...userData } = formData; // Remove confirmPassword before sending

    try {
        const res = await fetch('https://countryapis-backend.onrender.com/api/v1/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
            credentials: 'include',
          });
        const data = await res.json();
        console.log(data);
        if (data.success) {
            toast.success(data.message);
            navigate('/SignIn')
            setFormData({ name: '', email: '', password: '', confirmPassword: '', address: '', contactNumber: '' });

        } else {
            toast.error(data.message);
        }
        } catch (err) {
            toast.error('Registration failed');
        }
    };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-teal-50 px-4">
        <form onSubmit={handleSubmit} className="bg-white/60 p-8 rounded-lg shadow-md max-w-md w-full space-y-4 z-1 ">
          <h2 className="text-2xl font-bold text-teal-600 text-center">Sign Up</h2>

          {['name', 'email', 'password', 'confirmPassword', 'address', 'contactNumber'].map(field => (
            <div key={field}>
              <input
                type={(field === 'password' || field === 'confirmPassword') ? 'password' : 'text'}
                name={field}
                placeholder={
                  field === 'confirmPassword' ? 'Re-enter Password' : field.charAt(0).toUpperCase() + field.slice(1)
                }
                value={formData[field]}
                onChange={handleChange}
                required
                className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-teal-300 ${
                  field === 'confirmPassword' && !passwordMatch ? 'border-red-500' : ''
                }`}
              />
              {field === 'confirmPassword' && !passwordMatch && (
                <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={!passwordMatch}
            className={`w-full text-sm lg:text-xl font-medium py-2 rounded transition 
              ${passwordMatch ? 'bg-teal-600 text-white hover:bg-teal-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
