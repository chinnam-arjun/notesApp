import React, { useState } from 'react'
import BASE_URL from '../baseURL';
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const res = await fetch(`${BASE_URL}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        })
        if (res.ok) {
            const result = await res.json();
            localStorage.setItem("user", JSON.stringify(result.user));
            alert("Login successful");
            navigate("/dashboard");
            
        } else {
            alert("Login failed");
        }
        //console.log(user.role)
    }
    return (
        <div className='bg-gradient-to-br from-gray-400 to-blue-300 min-h-screen flex items-center justify-center min-w-1/2'>
            <div className='bg-transparent rounded-xl shadow-lg p-10 max-w-md w-full'>
                <h2 className='text-2xl font-bold mb-6 text-center'>Sign in</h2>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <input
                        type='email'
                        placeholder='Email'
                        className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        value={data.email}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        value={data.password}
                    />
                    <button
                        type='submit'
                        className='w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300'
                    >
                        Sign In
                    </button>
                    <p>dont have an acc ? just <Link to="/signup">Sign Up</Link></p>
                </form>
            </div>
        </div>
    )
}

export default SignIn