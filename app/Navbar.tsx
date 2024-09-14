import Link from 'next/link'
import React from 'react';
import { AiFillBug } from "react-icons/ai";



const navItems = [
    {
        label: "Dashboard",
        path: "/"
    },
    {
        label: "Issues",
        path: "/issues"
    }
]


const Navbar = () => {
    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
            <Link href={'/'}><AiFillBug /></Link>
            <div className='flex space-x-6'>
                {
                    navItems.map(navItem => {
                        return <Link
                            key={navItem.label}
                            href={navItem.path}
                            className='text-zinc-500 hover:text-zinc-800 transition-colors'
                        >
                            {navItem.label}
                        </Link>
                    })
                }
            </div>
        </nav>
    )
}

export default Navbar