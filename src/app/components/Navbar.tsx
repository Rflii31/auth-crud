import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from 'next-auth/next'
import Link from 'next/link'

const Navbar = async () => {
    const session = await getServerSession(authOptions);

    return (
        <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
            <Link href="/" legacyBehavior>
                <a className="text-2xl font-bold text-gray-800">Auth - CRUD</a>
            </Link>
            <div className="flex gap-4">
                <Link href="/" legacyBehavior>
                    <a className="text-gray-500 hover:text-black transition">Home</a>
                </Link>
                <Link href="/protected/dashboard" legacyBehavior>
                    <a className="text-gray-500 hover:text-black transition">Dashboard</a>
                </Link>

                {session && session.user?.email ? (
                    <div className="flex items-center gap-4">
                        <Link href="/auth/signout" legacyBehavior>
                            <a className="text-gray-500 hover:text-black transition">Sign Out</a>
                        </Link>
                        <p className="text-sm text-black">
                            Signed in as <span className="font-medium text-blue-400">{session.user?.email}</span>
                        </p>
                    </div>
                ) : (
                    <div className="flex gap-4">
                        <Link href="/auth/signin" legacyBehavior>
                            <a className="text-gray-500 hover:text-black transition">Sign In</a>
                        </Link>
                        <Link href="/auth/signup" legacyBehavior>
                            <a className="text-gray-500 hover:text-black transition">Sign Up</a>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar;
