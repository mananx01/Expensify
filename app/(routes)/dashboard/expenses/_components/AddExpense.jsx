import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig';
import { budgets, expenses } from '@/utils/schema';
import React, { useState } from 'react'
import { toast } from 'sonner';


// auto refresh this page after adding new expense 

function AddExpense({budget,refreshData}) {

    const [name,setName] = useState();
    const [amount,setAmount] = useState();

    const addNewExpense = async () => {
        if(amount <= budget.amount-budget.totalSpend) {
            const result = await db.insert(expenses).values({
                name: name,
                amount: amount,
                budgetId: budget.id,
            }).
            returning({insertedId: budgets.id})

            console.log(result)
            refreshData();
            setName("")
            setAmount(0)

            if(result) {
                toast.success("Expense Added Successfully")
            }
        }
        else{
            toast.error('Overflowing Budget')
        }
       
    
    }


  return (
    <div className='border-2 rounded-lg p-5'>
        
        <h2 className='font-bold text-lg'>Add Expense for {budget.name}</h2>
        
        <div className='pt-4'>
            <h2 className='text-black font-medium text-bold m-2'>Expense</h2>
            <Input
                placeholder="e.g. Taxi"
                onChange={(e)=> {
                    setName(e.target.value)
                }} 
            />
        </div>

        <div className='pt-4'>
            <h2 className='text-black font-medium text-bold m-2'>Amount</h2>
            <Input
                type="number"
                placeholder="e.g. ₹ 370 /-"
                onChange={(e)=> {
                    setAmount(e.target.value)
                }} 
            />
        </div>


        <Button
            disabled={!(name&&amount)}
            className="mt-8 w-full"
            onClick={()=>addNewExpense()}
        >Add New Expense</Button>


    </div>
  )
}

export default AddExpense
