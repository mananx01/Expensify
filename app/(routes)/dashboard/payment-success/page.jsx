import { CheckCircle } from 'lucide-react'
import React from 'react'

function page({searchParams: { amount }}) {
  return (
    <div className='font-bold text-3xl text-green-600'>
      <div>
          <div className='font-bold text-green-950 text-2xl'>Amount: ${amount}</div>
          <div className='flex items-center gap-3 '>
              <h2 className='font-bold text-3xl text-green-600'>Payment Successful </h2>
              <CheckCircle/>
          </div>  
      </div>
    </div>
  )
}

export default page
