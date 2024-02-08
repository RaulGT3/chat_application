import React, {useEffect,useState} from 'react'
import socketIOClient from "socket.io-client"
import ChatBoxReceiver, { ChatBoxSender } from '../ChatBox'
import InputText from '../InputText'
import UserLogin from '../UserLogin'
import NavBar from '../Navbar'



export default function ChatContainer(){
    let socket = socketIOClient("http://localhost:5001")
    const [chats, setChats]=useState([])
    const [user, setUser]=useState(localStorage.getItem("user"))
    const[avatar,setAvatar]=useState(localStorage.getItem("avatar"))
    const[data,setdata]=useState([])
    const[data2,setdata2]=useState([])

    useEffect(()=>{
        
        socket.on('chat',senderChats=>{
            setChats(senderChats)
            
         
        })
       
    })

    useEffect(() => {
      
      fetchAndRenderOldMessages();
    }, []); 

    function sendchat(chat){
        socket.emit("chat",chat)
        
       
        
    }

    function addMessage(chat){
      (async () => {
        try {
         
          const response = await fetch(`http://localhost:5001/saved/${user}/${chat.message}`, {
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

      const newChat ={...chat,user,avatar}
        
      setChats([...chats,newChat])
      sendchat([...chats,newChat])
      
    }
    function logout(){
        localStorage.removeItem("user")
        localStorage.removeItem("avatar")
        setUser("")
    }
    function Ochats(){
        return chats.map((chat,index)=>{
            if(chat.user=== user)return<ChatBoxSender key = {index} message={chat.message} avatar={chat.avatar} user={chat.user}/>
            return <ChatBoxReceiver key = {index} message={chat.message} avatar={chat.avatar} user={chat.user}/>
        })
    }
    const fetchAndRenderOldMessages = async () => {
      try {
        
        const response = await fetch('http://localhost:5001/info');
        const data = await response.json();
        setdata(data)
      } catch (error) {
        console.error('Error fetching old messages:', error);
        return null;
      }
    };
 
   
    
    console.log('data2:', data2);
    return (
      <div  style={{display: 'flex', justifyContent:'center'}}>
      
        {user ? (
          
          
          <div  style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
              <div style={{display: 'flex',  flexDirection: 'row'}}>

              <NavBar />  
              </div>
              <div>
              <h4>Username: {user}</h4>
              <p onClick={() => logout()}>Log out</p>
              <div style={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'column',height:'300px',overflow:'scroll',width:'500px',border:'solid black'}}>
             
              {data.map((datas, index) => {
              if (datas.use === user) {
                return <ChatBoxSender key={index} message={datas.message} avatar={avatar} user={datas.use} />;
              } else {
                return <ChatBoxReceiver key={index} message={datas.message} avatar={avatar} user={datas.use} />;
              }
            })}
            
            
            <Ochats /> 
            </div>

             
            <InputText addMessage={addMessage} />
            </div>
            
          </div>
        ) : (
          <div>
            <UserLogin setUser={setUser} />
            <def style={{ display: 'flex'  }}>
          
            </def>
          
          </div>
        )}
      </div>
    );
}