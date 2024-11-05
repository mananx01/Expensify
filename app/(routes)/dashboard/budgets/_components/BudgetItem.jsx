import { budgets } from '@/utils/schema'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

function BudgetItem({budget}) {

  return (
    <Link href={"/dashboard/expenses/" + budget.id} className='p-4 bg-slate-100 rounded-lg shadow-sm border-2 hover:cursor-pointer hover:shadow-md h-[150px]'> 

        <div className='flex gap-2 items-center justify-between'>
            <div className='flex gap-2 items-center'>
                <h2 className='text-2xl bg-slate-200 rounded-full p-2'>{budget.icon}</h2>
                <div>
                    <h2 className='font-bold text-md'>{budget.name}</h2>
                    <h2 className='text-sm'>{budget.totalItems} items</h2>
                </div>
            </div>
            <h2 className='font-bold text-primary text-lg'>₹{budget.amount}</h2>
        </div>  

        <div className='mt-6'>  
            <div className='flex justify-between'>
                <h2 className='text-sm text-red-800'>₹{budget.totalSpend?budget.totalSpend:0} Spent</h2>
                <h2 className='text-sm text-green-900'>₹{budget.totalSpend? budget.amount-budget.totalSpend: budget.amount} Remaining</h2>
            </div>
            <div className='mt-2 w-full bg-slate-300 h-2 rounded-md'>
                <div className='w-[50%] bg-primary h-2 rounded-md'></div>
            </div>
        </div>

    </Link>
  )
}

export default BudgetItem
