'use client';

import Link from 'next/link'
import React from 'react';
import { AiFillBug } from "react-icons/ai";
import { usePathname } from 'next/navigation';


interface Navitems {
    label: string,
    path: string
}

const navItems: Navitems[] = [
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
    const currentPath = usePathname();

    return (
        <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
            <Link href={'/'}><AiFillBug /></Link>
            <div className='flex space-x-6'>
                {
                    navItems.map(navItem => {
                        return <Link
                            key={navItem.label}
                            href={navItem.path}
                            className={`${navItem.path === currentPath ? 'text-zinc-900': 'text-zinc-500'} hover:text-zinc-800 transition-colors`}
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