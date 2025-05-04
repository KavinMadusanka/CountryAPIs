import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Layout from '../components/Layout';
import Cookies from 'js-cookie';
import { useAuth } from '../context/auth';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('https://countryapis-backend.onrender.com/api/v1/auth/login', {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        // credentials: 'include',
      });
      const data = await res.json();
    //   console.log(data);

      setLoading(false);

      if (data.success) {
        const { token, user } = data;
    
                // Update auth context with user/shop/admin details
                setAuth({
                    ...auth,
                    token,
                    user, 
                });
        localStorage.setItem("auth", JSON.stringify({
            token,
            user
        }));
        Cookies.set('access_token', token, { expires: 7 });
        

        toast.success(data.message);
        navigate('/');
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (err) {
      setLoading(false);
      toast.error('An error occurred, please try again.');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-teal-50 flex justify-center items-center px-4">
        <div className="bg-white/60 p-8 rounded-lg shadow-md w-full max-w-md z-1">
          <h2 className="text-2xl font-bold text-teal-600 text-center mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4 z-1">
            <div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-teal-300"
                placeholder="Email"
                required
              />
            </div>

            <div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-teal-300"
                placeholder="Password"
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full text-sm lg:text-xl font-medium py-2 rounded transition ${
                loading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-teal-600 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
