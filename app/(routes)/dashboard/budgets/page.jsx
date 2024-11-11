import React from 'react'
import BudgetList from './_components/BudgetList'

function Budget() {
  return (
    <div className='h-screen p-10 bg-gradient-to-br from-slate-100 to-gray-200'>
      <h2 className='font-bold text-3xl'>My Budgets </h2>
      <BudgetList/>
    </div>
  )
}

export default Budget
