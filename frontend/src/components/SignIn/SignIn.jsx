import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext'; // adjust the path as needed

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Get login function from context

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SITE_URL}/api/users/loginUser`,
                { email, password },
                { withCredentials: true }
            );

            if (response.status === 200) {
                const { token, user } = response.data;

                login(user, token); // ✅ update AuthContext
                navigate('/'); // Redirect after login
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
                <h2 className='text-2xl font-semibold text-center text-gray-700 mb-6'>Welcome to NextGenWrites</h2>
                <form onSubmit={handleSave}>
                    <div className='mb-4'>
                        <label className='block text-gray-600 text-sm font-medium mb-2'>Email</label>
                        <input 
                            type='email' 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your email' 
                            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-600 text-sm font-medium mb-2'>Password</label>
                        <input 
                            type='password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter your password' 
                            className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
                            required
                        />
                    </div>
                    <button 
                        type='submit' 
                        className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300'
                    >
                        Sign In
                    </button>
                </form>
                <p className='text-sm text-gray-500 text-center mt-4'>
                    Don't have an account?{' '}
                    <span 
                        className='text-blue-500 hover:underline cursor-pointer' 
                        onClick={() => navigate('/signup')}
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
}

export default SignIn;
