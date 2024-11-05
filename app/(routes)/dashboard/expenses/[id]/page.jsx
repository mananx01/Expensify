// to create dynamic route we must create name of the route folder as
// [nameOfparameter] for which we want to create different routes
// eg. we want "localhost:3000/dashboard/expenses/80" -> 80 is id 

"use client"
import { db } from '@/utils/dbConfig'
import { budgets, expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import BudgetItem from '../../budgets/_components/BudgetItem'
import AddExpense from '../_components/AddExpense'

function ExpensesScreen({params}) {

    const {user} = useUser()

    const [budgetInfo,setBudgetinfo] = useState([]);

    const getBudgetInfo = async ()=> {
        
        const res = await db.select({
          ...getTableColumns(budgets), // getting all colums of budgets table 
          totalSpend: sql`sum(${expenses.amount})`.mapWith(Number),
          totalItems: sql`count(${expenses.id})`.mapWith(Number),
        }).from(budgets)
        .leftJoin(expenses,eq(budgets.id,expenses.budgetId))
        .where(eq(budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
        .where(eq(budgets.id,params.id))
        .groupBy(budgets.id) 
      
        if(res){
            setBudgetinfo(res[0])
            console.log("avavsdv", res)
        } 
    }
    

    useEffect(()=>{
        user&&getBudgetInfo()
    },[user])

   
    return (
        <div className='p-10'>
            <h2 className="text-3xl font-bold">My Expenses</h2>
            
            <div className='mt-5 grid grid-cols-1 md:grid-cols-2 gap-4'>
              
                {budgetInfo ? <BudgetItem budget={budgetInfo}/> : 
                    <div className='h-[150px] bg-slate-200 rounded-lg animate-pulse'></div>}
                
                <AddExpense budget={budgetInfo}/>
            </div>             
        
        </div>
    )
}

export default ExpensesScreen
