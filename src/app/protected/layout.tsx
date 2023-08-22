import { getServerSession} from 'next-auth/next'
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from 'next/link'


interface ProtectedLayoutProps {
    children: React.ReactNode | React.ReactNode[];
}

const ProtectedLayout =async ({children}: ProtectedLayoutProps) => {
    
    const session = await getServerSession(authOptions);

    if(!session || !session.user?.email) {
        return(
            <div className='text-2xl flex justify-center items-center h-screen'>
                <p>You must <Link href="/auth/signin" className='text-blue-300'>sign-in</Link> first to access this page!</p>
            </div>
        )
    }

    return (
        <>
        {children}
        </>
    )
}

export default ProtectedLayout