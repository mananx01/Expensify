"use client"

import React, { useState } from 'react'
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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/utils/dbConfig'
import { budgets } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'

  

function CreateBudget({refreshData}) {
    
    const [pickedEmoji, setPickedEmoji] = useState('😊');
    const [openEmojiBar, setOpenEmojiBar] = useState(1)
    
    const [name,setName] = useState();
    const [amount,setAmount] = useState(0) 

    const {user} = useUser()

    const onCreatebudget = async () => {
        const res = await db.insert(budgets)
        .values({
            name: name,
            amount: amount,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            icon: pickedEmoji
        }).returning({insertedId: budgets.id})

        if(res) {
            refreshData()
            toast("Budget Created Successfully !")
        }
    }

    return (
    <div>

        <Dialog>
            <DialogTrigger> 
                <div className='bg-slate-200 rounded-md p-10 items-center flex flex-col border-2 border-dashed
                    border-gray-400 cursor-pointer hover:shadow-md'>
                        <h1 className='text-3xl font-bold'>+</h1>
                        <h2>Create New Budget</h2>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Create New Budget</DialogTitle>
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
                            <h2 className='text-black font-medium text-bold m-2'>Budget Name</h2>
                            <Input
                                placeholder="e.g. Europe Tour"
                                onChange={(e)=> {
                                    setName(e.target.value)
                                }} 
                            />
                        </div>

                        <div className='pt-4'>
                            <h2 className='text-black font-medium text-bold m-2'>Budget Amount</h2>
                            <Input 
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
                            onClick={()=>onCreatebudget()}
                        >Create Budget</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    </div>
  )

}

export default CreateBudget
