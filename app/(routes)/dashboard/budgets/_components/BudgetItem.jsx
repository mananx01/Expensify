import { budgets } from '@/utils/schema'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

function BudgetItem({budget}) {

    const calcProgress = () => {
        const perc = (budget.totalSpend/budget.amount)*100;
        return perc.toFixed(2);
    }

  return (
    <Link href={"/dashboard/expenses/" + budget.id}> 

        <div className='p-4 bg-gradient-to-tl from-slate-100 via-slate-300 to-slate-400 rounded-lg shadow-sm border-black hover:cursor-pointer hover:shadow-md h-[150px]'>
            <div className='flex gap-2 items-center justify-between'>
                <div className='flex gap-2 items-center'>
                    <h2 className='text-2xl bg-slate-800 rounded-full p-2'>{budget.icon}</h2>
                    <div>
                        <h2 className='font-bold text-md'>{budget.name}</h2>
                        <h2 className='text-sm text-slate-800'>{budget.totalItems} items</h2>
                    </div>
                </div>
                <h2 className='font-bold text-primary text-lg'>${budget.amount}</h2>
            </div>  

            <div className='mt-6'>  
                <div className='flex justify-between'>
                    <h2 className='text-sm text-red-800'>${budget.totalSpend?budget.totalSpend:0} Spent</h2>
                    <h2 className='text-sm text-green-900'>${budget.totalSpend? budget.amount-budget.totalSpend: budget.amount} Remaining</h2>
                </div>
                {/* progress bar */}
                {/* <div className='mt-2 w-full bg-slate-300 h-2 rounded-md'>
                    <div className='w-[50%] bg-primary h-2 rounded-md'
                        style={{
                            width:`${calcProgress()}%`
                        }}
                    ></div>
                </div> */}

                <div className='mt-2'>
                    <span
                        role="progressbar"
                        aria-labelledby="ProgressLabel"
                        aria-valuenow="75"
                        className="relative block rounded-full bg-gray-300"
                        style={{height: "10px"}}
                    >
                        <span className="block h-[10px] rounded-full bg-primary text-center" style={{width: `${calcProgress()}%`}}> </span>
                    </span>
                </div>
            </div>

        </div>

    </Link>
  )
}

export default BudgetItem
