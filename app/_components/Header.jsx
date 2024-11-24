// _ is added to the folder name bcz if it is not used wiht _
// next will take it as a route
// 'rfce' for boiler plate code 

"use client"
import React from 'react'
import Image from 'next/image'
import { useUser, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
function Header() {
    const {user,isSignedIn} = useUser();

  return (  
    <div className='bg-black p-5 gap-5 flex justify-between items-center shadow-sm'>
        <div className='flex items-center gap-4'>
            <Image 
                className='rounded-full'
                src={'/newlogo.svg'}
                alt = "logo"
                width={50}
                height={30}
            ></Image>
            <h2 className='font-serif text-teal-400 text-3xl'>Split Ledger</h2>
        </div>
       

        {isSignedIn? 
            <div style={{width: "50px", height: "50px"}}>
                <UserButton appearance={{
                    elements: {
                        userButtonAvatarBox: {
                            width: "100%",
                            height: "100%"
                        },
                    },
                }} />
            </div>
           
            :
            <Link href='/sign-in'>
                <Button>Get Started</Button>
            </Link>
            
        }
        
    </div>
  )
}

export default Header
