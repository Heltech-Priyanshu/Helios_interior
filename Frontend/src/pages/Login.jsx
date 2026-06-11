import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Logindata } from "../services/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
 
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(Logindata.login, formData);
      console.log(res);
      setFormData(res.data);
      if (res.data.success === true || res.data.token ) {
        localStorage.setItem("token",res?.data?.token)
        navigate("/admin/companydetails");
      }
      
    } catch (error) {
      console.log('====================================');
      console.log('error',error);
      console.log('====================================');
      
    }

    
  };

  const handelOnChange = (e) => {
    const { name, value } = e.target

    setFormData(
       {...formData ,  [name]: value  }
    )
    
    
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center p-6">
      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Top Section */}
        <div className="bg-blue-600 p-8 text-white text-center">
          <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>

          <p className="text-blue-100">Login to access your dashboard</p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition">
                <FaEnvelope className="text-gray-400 mr-3" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handelOnChange}
                  placeholder="Enter your email"
                  className="w-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition">
                <FaLock className="text-gray-400 mr-3" />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handelOnChange}
                  placeholder="Enter your password"
                  className="w-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" />
                Remember me
              </label>

              <button type="button" className="text-blue-600 hover:underline">
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm mt-6">
            © 2026 Admin Dashboard
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
