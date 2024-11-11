"use client"

import React from 'react'
import Image from 'next/image'
import { useUser, UserButton } from '@clerk/nextjs';

function Hero() {

    const {user, isSignedIn} = useUser();

  return (
    <section className="bg-black flex items-center flex-col">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
            <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl text-green-400">
            Track Effortlessly
                <strong className="font-extrabold text-green-800 sm:block">  Split Seamlessly
                </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed text-gray-400">
            Handle expenses with ease, so you can focus on what matters.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                className="block w-full rounded bg-red-900 px-12 py-3 text-sm font-medium text-gray-300 shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                href={isSignedIn? "/dashboard": "/sign-in"}
                >
                Get Started
                </a>
            </div>
            </div>
        </div>
       
        <Image src={'/newdashboard.png'}
            alt='dashboard image'
            width={900}
            height={500}
            className='-mt-3 rounded-xl border-2'
        ></Image>
    

    </section>
  )
}

export default Hero
