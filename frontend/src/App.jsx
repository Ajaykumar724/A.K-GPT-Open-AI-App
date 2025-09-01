import './App.css'
import ChatWindow from './ChatWindow.jsx';
import SideBar from './SideBar.jsx'; // changed casing to match file
import { MyContext } from './MyContext.jsx';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Login from './login.jsx';


function App() {
  const [prompt, setPrompt] = useState('');
  const [reply, setReply] = useState(null);
  const [threadId, setThreadId] = useState(uuidv4());
  const [prevChat, setPrevChat] = useState([]); // added state for previous thread
  const [newChat, setNewChat] = useState(true); // state for new chat initiation
  const [allThreads, setAllThreads] = useState([]); // state to hold all threads

  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(()=>{
    fetch("http://localhost:8080/auth/status", {
      credentials: "include"
    })
    .then(res => res.json())
    .then(data => setIsLoggedin(data.isLoggedin))
    .catch(()=> setIsLoggedin(false));
  },[]);


  const contextValues = { isLoggedin, prompt, setPrompt, reply, setReply, threadId, setThreadId, prevChat, setPrevChat, newChat, setNewChat, allThreads, setAllThreads }; // passing values

  return (
    <div className='app'>
      {isLoggedin ? <MyContext.Provider value={contextValues}>
        <SideBar />
        <ChatWindow />
      </MyContext.Provider> : <Login />}
    </div>
  )
}

export default App
