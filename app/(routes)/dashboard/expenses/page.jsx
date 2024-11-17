"use client"
import React, { useEffect, useState } from 'react'
import ExpensesListTable from './_components/ExpensesListTable'
import { db } from '@/utils/dbConfig';
import { budgets, expenses } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';

function page() {

    const [expenselist, setExpenseList] = useState([])
    const {user} = useUser()

    const getAllExpenses = async ()=> { 

      const res = await db.select({
        id: expenses.id,
        name: expenses.name,
        amount: expenses.amount,
        createdAt: expenses.createdAt,
        paid: expenses.paid
      }).from(budgets)
      .rightJoin(expenses, eq(budgets.id, expenses.budgetId))
      .where(eq(budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(budgets.id));
  
      if(res) {
          setExpenseList(res)
      }
      console.log("expenses: ", res);
  
    }

    useEffect(() => {
        user&&getAllExpenses()
    },[user])
    


  return (
    <div className='h-screen p-10 bg-gradient-to-br from-slate-100 to-gray-200'>
      <ExpensesListTable expenseList={expenselist} refreshData={() => getAllExpenses()}/>
    </div>
  )
}

export default page
