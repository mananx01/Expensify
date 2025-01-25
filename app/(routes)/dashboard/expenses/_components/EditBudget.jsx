"use client"

import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { budgets } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import { eq } from 'drizzle-orm'


function EditBudget({budgetInfo,refreshData}) {

    const [pickedEmoji, setPickedEmoji] = useState(budgetInfo?.icon)
    const [openEmojiBar, setOpenEmojiBar] = useState(0)
    const [name,setName] = useState()
    const [amount,setAmount] = useState()


    useEffect(()=>{
        if(budgetInfo) {
            setPickedEmoji(budgetInfo?.icon)
            setName(budgetInfo?.name)
            setAmount(budgetInfo?.amount)
        }
    },[budgetInfo])


    const updateBudget = async ()=> {
        const res = await db.update(budgets)
        .set({
            name: name,
            amount: amount,
            icon: pickedEmoji
        })
        .where(
            eq(budgets.id,budgetInfo.id)
        )
        .returning()


        if(res) {
            refreshData()
            toast.success("Budget Updated Successfully !")
        }

    }


  return (
    <div>
        <Dialog>
            <DialogTrigger asChild> 
               <Button> <PenBox/> Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Edit Budget</DialogTitle>
                <DialogDescription>
                    
                    <div className='mt-5'>
                        <Button className='text-lg' variant='outline'  
                            onClick={()=> {
                                setOpenEmojiBar(!openEmojiBar)
                            }}
                        >{pickedEmoji}</Button>
                        <div className='absolute z-20'>
                            <EmojiPicker 
                            open={openEmojiBar}
                            onEmojiClick={(e)=> {
                                setPickedEmoji(e.emoji)
                                setOpenEmojiBar(0) 
                            }}
                            />
                        </div>

                        <div className='pt-4'>
                            <h2 className='text-black font-medium text-bold m-2'>New Budget Name</h2>
                            <Input
                                defaultValue={budgetInfo?.name}
                                placeholder="e.g. Europe Tour"
                                onChange={(e)=> {
                                    setName(e.target.value)
                                }} 
                            />
                        </div>

                        <div className='pt-4'>
                            <h2 className='text-black font-medium text-bold m-2'>New Budget Amount</h2>
                            <Input 
                                defaultValue={budgetInfo?.amount}
                                type="number"
                                placeholder="e.g. ₹ 1,40,000/- "
                                onChange={(e)=> {
                                    setAmount(e.target.value)
                                }} 
                            />
                        </div> 
                    </div>
                </DialogDescription>
                </DialogHeader>

                
                
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button 
                            className="mt-8 w-full"
                            disabled={!(name&&amount)}
                            onClick={()=>updateBudget()}
                        >Update Budget</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>


    </div>
  )
}

export default EditBudget
