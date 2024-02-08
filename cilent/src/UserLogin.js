import React from 'react'
import { useState } from 'react'



export default function UserLogin({setUser}){
    
    const[user,setAUser]=useState("")
    const[password,setPass]=useState("")
    const[data,setdata]=useState("")
    

      

    function handleuser(){
        
        if(!user || !password){
            alert("user or password empty")
            return
        } 
        const checkuserandpass= async()=>{
            try{
                const response = await fetch(`http://localhost:5001/checker_UP/${user}/${password}`);
                if(response.ok){
                    const data = await response.json();
                    
                    if(data.statuse){
                        localStorage.setItem("user",user)
                        setUser(user)
                        localStorage.setItem("avatar","https://picsum.photos/id/237/200/300")

                    }else{
                        alert("username or password inncorect")
                    }

                }else{
                    console.log("error")
                }

            }catch(error){
                console.error('Error loging in:', error);
            }
        }
        checkuserandpass();
        

    }
    function handleRegister() {
        
        if (!user || !password) {
            alert("user or password empty")
            return
        }
        
        const checkUsername = async () => {
          try {
            
            const response = await fetch(`http://localhost:5001/checker/${user}`);
            
            if (response.ok) {
              
              const data = await response.json();
              
              
              if (data.exists) {

                console.log('Username already exists');
                alert('Username already exists')
              } else {
                
                console.log('Username is available. Proceed with registration.');
                (async () => {
                    try {
                     
                      const response = await fetch(`http://localhost:5001/register/${user}/${password}`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      });
                
                      if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                      }
                
                      const data = await response.json();
                      console.log('Success:', data);
                    } catch (error) {
                      console.error('Error:', error);
                    }
                  })();
                alert('Username is available. Proceed with registration.')
                
              }
            } else {
              
              console.log('Error checking username availability');
            }
          } catch (error) {
            console.error('Error checking username:', error);
          }
        };
      
        
        checkUsername();
      }
      
    
    return(
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' ,paddingTop:'200px' }}>
             <input placeholder='your name'  value={user}  onChange={e=>setAUser(e.target.value)}/>

             <input placeholder='Password'  value={password}  onChange={e=>setPass(e.target.value)}/>
             <button onClick={()=>handleuser() }> 
             login
             </button>
             <button onClick={()=>handleRegister()}> 
             register
             </button>
             

        </div>
    )
}