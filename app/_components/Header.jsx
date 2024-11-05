// _ is added to the folder name bcz if it is not used wiht _
// next will take it as a route
// 'rfce' for boiler plate code 

"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useUser, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
function Header() {
    const {user,isSignedIn} = useUser();

  return (  
    <div className='p-5 flex justify-between items-center border shadow-sm'>
        <Image 
            src={'./logo.svg'}
            alt = "logo"
            width={160}
            height={100}
        ></Image>
        {isSignedIn? 
            <UserButton/> :
            <Link href='/sign-in'>
                <Button>Get Started</Button>
            </Link>
            
        }
        
    </div>
  )
}

export default Header
