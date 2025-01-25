import { DollarSign, PiggyBank, ReceiptText, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function CardsInfo({budgetList}) {

    const [total_spend, setTotalSpend] = useState(0)
    const [total_budget, setTotalBudget] = useState(0)


    useEffect(()=> {
        budgetList&&calcCardInfo()
    },[budgetList])

    const calcCardInfo = () => {
        let total_spend = 0;
        let total_budget = 0;
        budgetList.forEach(el => {
            total_budget = total_budget + Number(el.amount)
            total_spend = total_spend + Number(el.totalSpend)
        }); 
        
        console.log("bidget list: ", budgetList)
        setTotalBudget(total_budget)
        setTotalSpend(total_spend)
        console.log("datatc: ", total_budget,total_spend)
        console.log("items: ", budgetList.length)
    }
  

  return (

    <div>
        {budgetList.length > 0 ? 
            <div className='mt-7 grid grid-cols-1 md:grid-cols-3 gap-5'>

            <div className='p-5 border-2 border-black rounded-lg flex justify-between items-center gap-2'>
                <div>
                    <h2 className='text-sm'>Total budgets</h2>
                    <h2 className='font-bold text-2xl'>$ {total_budget}</h2>
                </div>
                <PiggyBank className='h-12 w-12 rounded-full text-white bg-blue-700 p-3'/>
            </div>
            <div className='p-7 border-2 border-black rounded-lg flex justify-between items-center gap-2'>
                <div>
                    <h2 className='text-sm'>Total Spend</h2>
                    <h2 className='font-bold text-2xl'>$ {total_spend}</h2>
                </div>
                <Wallet className='h-12 w-12 rounded-full text-white bg-blue-700 p-3'/>
            </div>
            <div className='p-7 border-2 border-black rounded-lg flex justify-between items-center gap-2'>
                <div>
                    <h2 className='text-sm'>Number of budgets</h2>
                    <h2 className='font-bold text-2xl'> {budgetList?.length} </h2>
                </div>
                <ReceiptText className='h-12 w-12 rounded-full text-white bg-blue-700 p-3'/>
            </div>

            </div>
            :
            <div className='mt-7 grid grid-cols-1 md:grid-cols-3 gap-5'>
                {[1,2,3].map((item,index) => {
                    return <div key={index} className='h-[110px] w-full bg-slate-200 animate-pulse rounded-lg '></div>
                })}
            </div> 
        }
        
    </div>

  )
}

export default CardsInfo
