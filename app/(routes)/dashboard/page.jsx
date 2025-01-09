"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardsInfo from './_components/CardsInfo'
import { budgets, expenses } from '@/utils/schema'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { db } from '@/utils/dbConfig'
import BarChartDashboard from './_components/BarChartDashboard'
import BudgetItem from './budgets/_components/BudgetItem'
import ExpensesListTable from './expenses/_components/ExpensesListTable'


function Dashboard() {

  const {user} = useUser()

  const [budgetlist,setBudgetList] = useState([])
  const [expenselist,setExpenseList] = useState([])

  const[loading,setLoading] = useState(true);
  const[error,setError] = useState(null);

  useEffect(()=>{
    if(user) {
      getBudgetInfo()
    }
  },[user])

  const getBudgetInfo = async ()=>{ 

    try{
      setLoading(true);
      const res = await db.select({
        ...getTableColumns(budgets),
        totalSpend: sql`sum(${expenses.amount})`.mapWith(Number),
        totalItems: sql`count(${expenses.id})`.mapWith(Number),
      }).from(budgets)
      .leftJoin(expenses,eq(budgets.id,expenses.budgetId))
      .where(eq(budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
      .groupBy(budgets.id) 

      setBudgetList(res)
      await getAllExpenses()  
    }
    catch(err){
      setError("Failed to load budget Data.");
      console.error(err);
    }
    finally{
      setLoading(false);
    }

  }

  
  const getAllExpenses = async ()=> { 
    try {
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
    }
    catch(err) {
      setError("Failed to load expenses data.");
      console.error(err);
    }
   
    // console.log("expenses: ", res);

  }

  if(loading) {
    return <div className='p-10 bg-slate-100'>Loading...</div>
  }

  if(error) {
    return (
      <div className="p-10 bg-slate-100">
        <h2 className="text-3xl font-bold text-red-500">Error</h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }


  return (
    <div className='p-10 bg-slate-100' > 

      <h2 className='text-3xl font-bold'>Hi, {user?.fullName} ! </h2>
      <p className='text-gray-600'>Here what happening with your money, Let's manage your expense </p>
      
      <CardsInfo budgetList={budgetlist}/>
      
      <div className='grid grid-cols-1 md:grid-cols-3 mt-10 gap-5'> 
        <div className='md:col-span-2'>
          <h2 className='font-bold text-lg mb-3'>Activity</h2>
          <BarChartDashboard budgetList={budgetlist}/>
          <ExpensesListTable expenseList={expenselist} refreshData={() => getBudgetInfo()}/>
        </div>
        <div className='grid gap-3'>
          <h2 className='font-bold text-lg'>Latest Budgets</h2>
          {budgetlist.map((budget,index) => {
            return <div>
              <BudgetItem budget={budget} key={index} />
            </div>
          })}
        </div>
      </div>

    </div>
  )
}

export default Dashboard
