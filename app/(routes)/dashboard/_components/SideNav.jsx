"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { GroupIcon, LayoutGrid , PiggyBank, ReceiptIndianRupee, ShieldCheck, Wallet } from 'lucide-react'
import { SignOutButton, UserButton, useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { Button } from '@/components/ui/button'

function SideNav() {

    const {user} = useUser()

    const menuItems = [

        {
            id: 1, 
            name: "Dashboard",
            icon: LayoutGrid,
            path: "/dashboard"
        },
        {
            id: 2,
            name: "Budgets",
            icon: PiggyBank,
            path: "/dashboard/budgets"

        },
        {
            id: 3,
            name: "Expenses", 
            icon: ReceiptIndianRupee,
            path: `/dashboard/expenses/`
        },
        {
            id: 4, 
            name: "Upgrade",
            icon: ShieldCheck ,
            path: "/dashboard/upgrade"
        },
        {   
            id: 5,
            name: "Groups",
            icon: GroupIcon,
            path: "/dashboard/groups"
        }
        ,{
            id: 6,
            name: "Payments",
            icon: Wallet,
            path: "/dashboard/wallet"
        }
    ]

    const path = usePathname()

    useEffect(()=> {
        console.log(path)
    },[])

  return (
    <div className='h-screen p-5 border shadow-sm bg-slate-950'>

        <div className='flex items-center gap-4'>
            <Image src={'/newlogo.svg'}
                alt="logo image"
                width={50}
                height={30} 
            ></Image>
            <h2 className='text-gray-300 text-2xl'>Expensify</h2>
        </div>


        <div className='mt-8'>
            {menuItems.map((menu,index) => (    

                <Link key={index} href={menu.path}>

                    <h2 className={`flex gap-2 items-center mb-2 text-gray-300 font-medium p-3 cursor-pointer rounded-md
                    hover:text-primary hover:bg-blue-300 
                    ${path==menu.path&& 'bg-blue-950 text-slate-100'}
                    `}>
                        <menu.icon/> 
                        {menu.name}
                    </h2>

                </Link>
                
            ))}

        </div>
            

        <div className='flex items-center gap-2 fixed bottom-16'>
            <UserButton/>
            <h2 className='text-gray-200'>{user?.fullName}</h2>
        </div>
        

    </div>
  )
}

export default SideNav
