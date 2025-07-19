import React, { useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import { assets } from "../assets/assets_frontend/assets";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { doctorLogin } = useContext(AdminContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            const result = await doctorLogin(email, password);
            if (result.success) {
                toast.success("Login successful!");
                // Redirect will be handled by the context
            } else {
                toast.error(result.message || "Login failed");
            }
        } catch (error) {
            toast.error("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="text-center mb-8">
                    <img
                        src={assets.logo}
                        alt="Prescripto Admin"
                        className="w-32 mx-auto mb-4"
                    />
                    <h2 className="text-2xl font-bold text-gray-800">Admin Panel Login</h2>
                    <p className="text-gray-600 mt-2">Access the admin dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a
                            href="https://prescripto-frontend-ten.vercel.app/signup"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Register here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login; 