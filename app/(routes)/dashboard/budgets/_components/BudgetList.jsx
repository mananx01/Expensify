"use client"

import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { db } from '@/utils/dbConfig'
import { eq, getTableColumns, SQL, sql } from 'drizzle-orm'
import { budgets, expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import BudgetItem from './BudgetItem'

function BudgetList() {

  const [budgetList,setBudgetList] = useState([])

  const {user} = useUser()

  useEffect(()=> {
    user&&getBudgetList()
  },[user])

 
  // used to fetch budget list
  const getBudgetList = async ()=> {
    const res = await db.select({
      ...getTableColumns(budgets), // getting all colums of budgets table 
      totalSpend: sql`sum(${expenses.amount})`.mapWith(Number),
      totalItems: sql`count(${expenses.id})`.mapWith(Number),
    }).from(budgets)
    .leftJoin(expenses,eq(budgets.id,expenses.budgetId))
    .where(eq(budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
    .groupBy(budgets.id) 
  
    if(res){
      setBudgetList(res)
      console.log("result totalitems: ", res.totalItems)
    } 

  }


  return (
    <div className='mt-5'>
        
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget refreshData={()=>{
          getBudgetList()
        }}/>
        {budgetList.length > 0 ? budgetList.map((budget) => {
        return <BudgetItem budget={budget}/>
      }) : 
        [1,2,3,4].map((items,index) => (
          <div className='bg-slate-200 rounded-lg w-full h-[140px] animate-pulse shadow-md'></div>
        ))

      }
      </div>
      
      {/* it will return a div which will be a part of grid */}
      
    
    </div>
  )
}

export default BudgetList
