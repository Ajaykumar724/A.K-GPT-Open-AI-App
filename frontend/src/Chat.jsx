import './Chat.css';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from './MyContext.jsx';
import rehypeHighlight from 'rehype-highlight';
import Markdown from 'react-markdown';
import 'highlight.js/styles/github-dark.css';

export default function Chat() {
    const { newChat, prevChat, reply, allThreads, threadId, isLoggedin } = useContext(MyContext);

    const [latestChat, setLatestChat] = useState("");

    useEffect(()=>{
      setLatestChat("");
    },[threadId])

    useEffect(() => {
        if (!prevChat?.length || !reply) return;


        const words = reply.split(" ");
        let idx = 0;

        const interval = setInterval(() => {
            setLatestChat(words.slice(0, idx + 1).join(" "));
            idx++;
            if (idx >= words.length) clearInterval(interval);
        }, 40);

        return () => clearInterval(interval);
    }, [prevChat, reply]);

    return (
        <>
          { newChat && <div className='new-chat'>Ask anything in your mind...</div>}
          <div className="chat">
            {
                prevChat?.map((chat, index) => <div className={chat.role === "user"? "userDiv" : "assistDiv"} key={index}>
                    {
                        chat.role === "user"?
                        <p className='user-message'>{chat.content}</p>:
                        index === prevChat.length - 1 ? (
                            <Markdown class="assistant-message" rehypePlugins={[rehypeHighlight]}>
                                {latestChat || chat.content}
                            </Markdown>
                        ) : (
                            <Markdown class="assistant-message" rehypePlugins={[rehypeHighlight]}>
                                {chat.content}
                            </Markdown>
                        )
                    }
                </div>
                )
            }
          </div>
        </>
    )
}