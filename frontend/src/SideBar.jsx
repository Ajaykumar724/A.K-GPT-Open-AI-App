import './SideBar.css';
import { useState, useContext, useEffect } from 'react';
import { MyContext } from './MyContext.jsx';
import { v4 as uuidv4 } from 'uuid';


export default function SideBar() {
    const  {allThreads, setAllThreads, threadId, setNewChat, setPrompt, setReply, setThreadId, setPrevChat} = useContext(MyContext);
    
    const getThreads = async () => {
          try {
            const response = await fetch("http://localhost:8080/api/thread", {credentials : "include"});
            const res = await response.json();
            const filteredData = res.map(thread=> ({threadId : thread.threadId, title: thread.title }));
            setAllThreads(filteredData);
            // console.log(filteredData);
          } catch(err) {
            console.log(err);
          } 
    }

    useEffect(()=> {
        getThreads();
    },[threadId]);


    const createNewChat = () => {
          setNewChat(true);
          setPrompt("");
          setReply(null);
          setThreadId(uuidv4());
          setPrevChat([]);
    }

    const prevThread = async (tId) => {
        setThreadId(tId);

        try {
            const response = await fetch(`http://localhost:8080/api/thread/${tId}`, {
                credentials: "include"
            });
            const res = await response.json();
            // console.log(res);
            setPrevChat(res);
            setNewChat(false);
            setPrompt("");
            setReply(null);            
        } catch(err) {
            console.log(err);
        }
    }

    const deleteThread = async (tId) => {
        try {
            const deleted = await fetch(`http://localhost:8080/api/thread/${tId}`, { method: 'DELETE', credentials: "include"});
            const res = await deleted.json();
            // console.log(res);
            getThreads();
            
            if(tId === threadId) {
                createNewChat();
            }   
        } catch(err) {
            console.log(err);
        }
    }


    return (
        <section className='sidebar'>
            
            {/* button */}
            <button className='new-chat-btn' onClick={createNewChat}>
                <img src='/media/images/A_K_GPT.png' alt='A.K GPT Logo' className='logo'/>
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>

            {/* history */}
                <ul className='history'>
                    {allThreads?.map((thread, idx) => (
                        <li key={idx} onClick={(e)=>{prevThread(thread.threadId)}}>{thread.title} <i className="fa-solid fa-trash" onClick={(e)=> {e.stopPropagation(); deleteThread(thread.threadId)}}></i></li>
                    ))}
                </ul>


            {/* sign up */}
            <div className='sign'>
                <a className='signup-btn'>Let's try to A.K GPT</a>
            </div>
        </section>
    );
}