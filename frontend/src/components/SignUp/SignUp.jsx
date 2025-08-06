import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ⬅️ import navigate hook

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate(); // ⬅️ initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setMessage("Please fill in all fields.");
            return;
        }

        try {
            await axios.post(`${import.meta.env.VITE_SITE_URL}/api/users/register`, {
                name,
                email,
                password
            });

            setMessage("Registration successful! Redirecting to login...");

            // Redirect to login after short delay
            setTimeout(() => {
                navigate('/signin');
            }, 1500); // 1.5 seconds

        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(error.response.data.message || "Registration failed.");
            } else {
                setMessage("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form 
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

                {message && (
                    <p className={`mb-4 text-center font-medium ${message.includes('successful') ? 'text-green-600' : 'text-red-500'}`}>
                        {message}
                    </p>
                )}

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignUp;
