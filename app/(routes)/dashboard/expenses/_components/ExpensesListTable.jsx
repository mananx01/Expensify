import { Button } from '@/components/ui/button'
import { db } from '@/utils/dbConfig'
import { expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'


import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  


function ExpensesListTable({expenseList,refreshData}) {

    const router = useRouter()

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


    const handlePay = async (expenseID, expenseName, expenseAmount) => {
        console.log(expenseID, expenseName, expenseAmount)
        router.replace(`/dashboard/wallet?expenseID=${expenseID}&expenseName=${expenseName}&expenseAmount=${expenseAmount}`);
    }


  return (
    <div className='mt-3'>
        <h2 className='font-bold text-lg mb-2 mt-8'>Latest Expenses</h2>

        <Table className="rounded-lg bg-slate-300">
            <TableCaption className="text-slate-200">A list of your recent expenses.</TableCaption>
            <TableHeader className="bg-slate-400">
                <TableRow>
                <TableHead className="w-[100px] text-black font-bold text-lg">Name</TableHead>
                <TableHead className="text-black text-lg font-bold">Amount</TableHead>
                <TableHead className="text-black text-lg font-bold">Date</TableHead>
                <TableHead className="text-black text-lg font-bold">Pay</TableHead>
                <TableHead className="text-black text-lg font-bold">Action</TableHead>
                <TableHead className="text-black text-lg font-bold">Paid</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>

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
                    return <TableRow key={index}>
                        <TableCell className="font-medium">{expenses.name}</TableCell>
                        <TableCell>${expenses.amount}</TableCell>
                        <TableCell>{formattedDate}</TableCell>
                        <TableCell><Button 
                                disabled={expenses.paid}
                                onClick={() => handlePay(expenses.id, expenses.name,expenses.amount)}
                                className="w-[100px] bg-green-600"
                            >Pay</Button></TableCell>
                        <TableCell>
                            <Trash className='text-red-600 hover: cursor-pointer'
                            onClick={()=>deleteExpense(expenses)}></Trash>
                        </TableCell>
                        <TableCell>{expenses.paid? <h2 className='text-green-600 font-bold'>PAID</h2> : <h2 className='text-red-900 font-bold'>DUE</h2>}</TableCell>
                    </TableRow>

                })}

            
            </TableBody>
        </Table>


    </div>
  )
}

export default ExpensesListTable
