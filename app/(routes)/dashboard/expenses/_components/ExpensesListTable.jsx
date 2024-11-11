import { db } from '@/utils/dbConfig'
import { expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

function ExpensesListTable({expenseList,refreshData}) {

    const deleteExpense = async (expense) => {
        const res = await db.delete(expenses)
        .where(eq(expenses.id,expense.id))
        .returning()

        console.log("id: ", res)

        if(res){ 
            toast.success("Expense Deleted Successfully")
            refreshData()
        }
    }

    

  return (
    <div className='mt-3'>
        <h2 className='font-bold text-lg mb-2 mt-8'>Latest Expenses</h2>
        <div className='grid grid-cols-4 bg-slate-400 p-2 border rounded-t-md font-bold' >
            <h2>Name</h2>
            <h2>Amount</h2>
            <h2>Date</h2>
            <h2>Action</h2>
        </div>
        <div className='border rounded-b-md bg-slate-300'>    
            {expenseList.map((expenses,index) => {
                
                const createdAt = expenses.createdAt;
                const formattedDate = new Date(createdAt).toLocaleDateString("en-US",{
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true, 
                });
                return <div className='grid grid-cols-4 p-2'>
                    <h2>{expenses.name}</h2>
                    <h2>{expenses.amount}</h2>
                    {/* <h2>{expenses.createdAt}</h2> */}
                    <h2>{formattedDate}</h2>
                    <h2>
                        <Trash className='text-red-600 hover: cursor-pointer'
                        onClick={()=>deleteExpense(expenses)}></Trash>
                    </h2>
                </div>

            })}

        </div>
       
    </div>
  )
}

export default ExpensesListTable
