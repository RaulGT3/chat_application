import React from 'react'
import { useState } from 'react'
export default function InputText({addMessage}){
    const [message,setmessage]=useState('')
    function handleAddMessage(){
        addMessage({
            message
        })
        setmessage('')

    }
    return(
        <div>
            <input placeholder='Say your Thoughts'  value={message }  onChange={e=>setmessage(e.target.value)}/>
            <button onClick={()=>handleAddMessage() }> 

            </button>
        </div>


    )
}