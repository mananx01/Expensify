import { UserButton } from '@clerk/nextjs'
import React from 'react'

function DashboardHeader() {
  return (
    <div className='bg-gradient-to-bl from-slate-200 via-slate-300 to-slate-300 p-5 border-b shadow-inner flex justify-between items-center'>    
      
      <div className="slide-text-container w-full text-primary font-medium">
        <span className="slide-text">
          Simplify your Expenses with Expensify !!
        </span>
      </div>


      {/* <div className="relative">
        <label htmlFor="Search" className="sr-only"> Search </label>

        <input
          type="text"
          id="Search"
          placeholder="Search for..."
          className="w-full rounded-lg border-2 border-gray py-2.5 pe-10 shadow-md sm:text-sm p-2"
        />

        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
          <button type="button" className="text-gray-600 hover:text-gray-700">
            <span className="sr-only">Search</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </span>
      </div> */}


        <div className="rounded-full" style={{width: "40px", height: "40px"}}>
            <UserButton appearance={{
                elements: {
                    userButtonAvatarBox: {
                        width: "100%",
                        height: "100%"
                    },
                },
            }} />
        </div>
    </div>
  )
}

export default DashboardHeader
