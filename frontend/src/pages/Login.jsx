import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    // Get values from the context
    const { backendUrl, setToken, navigate } = useContext(ShopContext);

    // State to toggle between 'Login' and 'Sign Up' forms
    const [currentState, setCurrentState] = useState("Sign Up");

    // Use separate states for each input
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Form submission logic as per screenshots
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (currentState === "Sign Up") {
                const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem('token', response.data.token); // Key is 'token'
                    navigate("/");
                } else {
                    toast.error(response.data.message);
                }
            } else { // This handles the "Login" state
                const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem('token', response.data.token);
                    navigate("/");
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message); // Error handling as in the screenshot
        }
    };

    return (
        <div className="py-24">
            <form onSubmit={onSubmitHandler} className="flex flex-col w-[90%] sm:max-w-md mx-auto mt-14 gap-6">
                {/* Dynamic Title */}
                <div className="inline-flex items-center gap-2 mb-2 self-center">
                    <p className="prata-regular text-3xl">{currentState}</p>
                    <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
                </div>

                {/* Input Fields */}
                <div className="flex flex-col gap-5">
                    {currentState === "Sign Up" && (
                        <input
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            className="w-full px-3 py-2 border border-gray-800"
                            placeholder="Your Name"
                            required
                        />
                    )}
                    <input
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        className="w-full px-3 py-2 border border-gray-800"
                        placeholder="Your Email"
                        required
                    />
                    <input
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        className="w-full px-3 py-2 border border-gray-800"
                        placeholder="Password"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full bg-black text-white font-light py-2.5 mt-2 text-lg">
                    {currentState === "Sign Up" ? "Create account" : "Sign In"}
                </button>

                {/* Toggle between Login and Sign Up */}
                {currentState === "Login"
                    ? <p>Don't have an account? <span className="cursor-pointer font-semibold" onClick={() => setCurrentState("Sign Up")}>Create account</span></p>
                    : <p>Already have an account? <span className="cursor-pointer font-semibold" onClick={() => setCurrentState("Login")}>Login Here</span></p>
                }
            </form>
        </div>
    );
};

export default Login;