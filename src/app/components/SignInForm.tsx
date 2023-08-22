"use client";

import React, { useEffect, useState } from "react";
import { signUp } from "../actions/users/signUp";
import {signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import Link from 'next/link'


const SignInForm = () => {
    const router = useRouter();

    const {status} = useSession();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [message, setMessage] = useState('')

    const handleSubmit = async () => {
        setMessage("Signing in.....");
        
        try {
            const signInResponse = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })
            
            if(!signInResponse || signInResponse.ok !== true) {
                setMessage("Invalid credentials");
            }else {
                router.refresh();
            }
        } catch(err) {
            console.log(err);
        }
        
        setMessage(message);
    }

    useEffect(() => {
        if(status === 'authenticated') {
            router.refresh();
            router.push("/")
        }
    }, [status]);

    return( 
        <div className="pb-20 pt-10 pl-10 pr-10 border rounded-lg max-w-[700px] mx-auto bg-white">
            <h1 className="mx-auto pb-5 text-3xl text-black">Sign In</h1>
            <p className="text-black">Don&apos;t have an account?</p>
            <Link href="signup" legacyBehavior><span className="text-blue-300">Create One</span></Link>
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

                <button className="bg-slate-500 hover:bg-slate-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-full text-[19px]" onClick={handleSubmit}>Sign In</button>

                <p className="w-full text-center mt-4">{message}</p>
                </div>
            </div> 
    )
}

export default SignInForm