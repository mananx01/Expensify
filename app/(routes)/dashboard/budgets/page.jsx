import React from 'react'
import BudgetList from './_components/BudgetList'

function Budget() {
  return (
    <div className='h-screen p-10 bg-gradient-to-bl from-slate-100 via-slate-200 to-slate-300'>
      <h2 className='font-bold text-3xl text-gray-900'>My Budgets </h2>
      <BudgetList/>
    </div>
  )
}

export default Budget
