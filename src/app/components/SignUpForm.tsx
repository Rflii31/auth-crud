"use client";

import React, { useState } from "react";
import { signUp } from "../actions/users/signUp";
import Link from 'next/link'


const SignUpForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async () => {
        setMessage("Signing up.....");
        const message = await signUp(email, password);
        setMessage(message);
    }

    return(
        <div className="pb-20 pt-10 pl-10 pr-10 border rounded-lg max-w-[700px] mx-auto bg-white">
            <h1 className="mx-auto pb-5 text-3xl text-black">Sign Up</h1>
            <p className="text-black">Already have an account?</p>
            <Link href="signin" legacyBehavior><span className="text-blue-300">Sign In here!</span></Link>
            <div className="max-w-[280px] mx-auto pt-5">
                <input
                    type="email" 
                    id="email"
                    className="bg-white w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium " 
                    placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} 
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    required
                />
                <input type="password" className="bg-white w-full px-6 py-3 mb-2 border border-slate-600 rounded-lg font-medium " placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <button className="bg-slate-500 hover:bg-slate-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-full text-[19px]" onClick={handleSubmit}>Sign Up</button>

                <p className="w-full text-center mt-4">{message}</p>
            </div>
        </div>
        
    )
}

export default SignUpForm