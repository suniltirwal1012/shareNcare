import { useEffect,useState } from 'react';
import axios from 'axios';


function Unread() {
    const [messages,setMessages]=useState([])

    async function getUnreadMessages(){
        const res=await axios.put("/api/v1/notifications/readingMessage")
        console.log(res.data.data.messages)
        setMessages(res.data.data.messages)
    }


    useEffect(() => {
        getUnreadMessages()
    }
    , [])


    return (
        <div className="h-[65vh] w-full p-8">
            {messages && messages.length > 0 && messages.map((messageObj, index) => (
                <div key={index} role="alert" className="alert alert-success m-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{messageObj.message}</span>
                </div>
            ))}
        </div>
    );
    
}

export default Unread;