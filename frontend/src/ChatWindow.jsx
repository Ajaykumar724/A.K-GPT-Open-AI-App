import { useContext, useState, useEffect } from 'react';
import './ChatWindow.css';
import { MyContext } from './MyContext';
import Chat from './Chat.jsx';
import { BounceLoader } from "react-spinners";


export default function ChatWindow() {
    const { prompt, setPrompt, reply, setReply, threadId, newChat, setNewChat, prevChat, setPrevChat } = useContext(MyContext);
    const [loding, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const getReply = async () => {
        setLoading(true);

        const currentPrompt = prompt;
        setPrevChat(prev => [...prev, { role: "user", content: currentPrompt }]);

        setPrompt('');
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include", 
            body: JSON.stringify({ message: currentPrompt, threadId: threadId }),
        };

        try {
            let response = await fetch('http://localhost:8080/api/chat', options);
            let res = await response.json();
            console.log(res);
            setReply(res.assistantReply);
        } catch (err) {
            console.log(err + " in handleClick function");
        }
        setLoading(false);
    }

    // append new chats to previous chat
    useEffect(() => {
        if (reply) {
            setPrevChat(prev => (
                [...prev, {
                    role: "A.K. GPT",
                    content: reply
                }]
            ))
        }
    }, [reply]);

    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    }

    const handleLogout = () => {
        window.location.href = 'http://localhost:8080/auth/logout'
    }
 

    return (
        <div className='chat-window'>
            <div className='navbar'>
                <span className='a_k-gpt'>A.K GPT&nbsp;<i className="fa-solid fa-caret-down"></i></span>
                <span className='profile' onClick={handleProfileClick}><i className="fa-solid fa-user"></i></span>
            </div>
            {  isOpen &&
                <div className='dropDown'>
                    <ul className='dropDownMenu'>
                        <li className='dropDownElement'><i className="fa-solid fa-gear"></i>Settings</li>
                        <li className='dropDownElement'><i className="fa-solid fa-cloud-arrow-up"></i>Upgrade</li>
                        <li className='dropDownElement' onClick={handleLogout} ><i className="fa-solid fa-arrow-right-to-bracket"></i>Log out</li>
                    </ul>
                </div>
            }

            <Chat></Chat>
            <div className='Loader'>
                <BounceLoader className='Loader' color='#fff' loading={loding} size={30} />
            </div>


            <div className='input-area'>
                <div className=''>
                    <input type='text' placeholder='Type anything in your mind...' value={prompt} onChange={(e) => { setPrompt(e.target.value) }} onKeyDown={(e) => { e.key === 'Enter' ? getReply() : '' }} />
                    <span className='send-btn' id='submit' onClick={getReply}><i className="fa-solid fa-circle-up"></i></span>
                </div>
                <div className='polices'>A.K GPT can make mistakes. Check important info. See <u>Cookie Preferences.</u></div>
            </div>

        </div>
    )

}