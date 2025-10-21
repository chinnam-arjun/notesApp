import React, { useState } from 'react'
import BASE_URL from '../baseURL';
import { Link,useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [data,setData] = useState({
        username : "",
        email : "",
        password : " "
    })
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
         e.preventDefault();
         const res = await fetch(`${BASE_URL}/auth/signup`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            credentials : "include",
            body : JSON.stringify(data)
         })
        if (res.ok) {
            const result = await res.json();
            localStorage.setItem("user", JSON.stringify(result.user));
            alert("user registered successful");
            navigate("/dashboard");
        } else {
            alert("signup failed");
        }
    }
  return (
    <div className='bg-gradient-to-br from-gray-400 to-blue-300 min-h-screen flex items-center justify-center min-w-1/2'>
        <div className='bg-transparent rounded-xl shadow-lg p-10 max-w-md w-full'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Sign Up</h2>
            <form className='space-y-4' onSubmit={handleSubmit}>
            <input 
                type='text' 
                placeholder='Username' 
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                onChange={(e)=>setData({...data,username:e.target.value})}
                value={data.username}
            />
            <input 
                type='email' 
                placeholder='Email' 
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                onChange={(e)=>setData({...data,email:e.target.value})}
                value={data.email}
            />
            <input 
                type='password' 
                placeholder='Password' 
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
                onChange={(e)=>setData({...data,password:e.target.value})}
                value={data.password}
            />
            <button 
                type='submit' 
                className='w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300'
            > 
            Sign Up
            </button>
            <p>already have an acc ? then <Link to={'/signin'}>SignIN</Link></p>
            </form>
        </div>
    </div>
  )
}

export default SignUp