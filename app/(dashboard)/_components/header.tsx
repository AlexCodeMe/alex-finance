'use client'

import { ClerkLoaded, ClerkLoading, UserButton, useUser } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Navigation from './navigation'
import Filters from './filters'

export default function Header() {
    const { user, isLoaded} = useUser()

    return (
        <header className='bg-gradient-to-b from-fuchsia-700 to-blue-500 px-4 py-8 lg:px-14 pb-36'>
            <div className='max-w-screen-2xl mx-auto'>
                <div className='w-full flex items-center justify-between mb-14'>
                    <div className='flex items-center lg:gap-x-16'>
                        <Link href="/">
                            <div className="items-center hidden lg:flex">
                                <Image src="/logo.svg" alt="Logo" width={28} height={28} />
                                <p className="font-semibold text-white text-2xl ml-2.5">
                                    Alex-Finance
                                </p>
                            </div>
                        </Link>
                        <Navigation />
                    </div>
                    <ClerkLoaded>
                        <UserButton afterSignOutUrl='/sign-in' />
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader2 className='h-8 w-8 animate-spin text-slate-400' />
                    </ClerkLoading>
                </div>
                <div className='space-y-2 mb-4'>
                    <h2 className='text-2xl lg:text-4xl text-white font-medium flex items-center'>
                        Welcome Back{isLoaded ? ', ' : ' '}{user?.firstName}
                    </h2>
                    <p className='text-sm lg:text-base text-[#89B6FD]'>
                        Here is your Financial Overview
                    </p>
                </div>
                <Filters />
            </div>
        </header>
    )
}
