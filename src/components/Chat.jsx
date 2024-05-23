import React, { useState, useEffect } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator, ConversationHeader, Avatar } from '@chatscope/chat-ui-kit-react';
import { fetchData } from '../data';

// const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const systemMessage = {
    "role": "system",
    "content": "Explain things like you're talking to a user who knows nothing about machine learning."
};

function Chat() {
    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm Maya! I can provide you with insights from the data.",
            sentTime: "just now",
            direction: 'incoming',
            sender: "Maya"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const fetchedData = await fetchData();
                console.log('openai data', fetchedData);
                setData(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getData();
    }, []);

    const handleSend = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);
        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) {
        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "Maya") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role: role, content: messageObject.message }
        });


        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages,
                {
                    role: "system",
                    content: `Assume that you are a data analyst. Now, Use the following data to help answer questions: ${JSON.stringify(data)}`
                }
            ],
            "temperature": 0.7,
            "max_tokens": 150,
            "n": 1,
            "stop": null,
            "presence_penalty": 0.6,
            "frequency_penalty": 0.0
        };

        await fetch("https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            }).then((data) => {
                return data.json();
            }).then((data) => {
                console.log('gemini', data);
                setMessages([...chatMessages, {
                    message: data.choices[0].message.content,
                    sender: "Maya"
                }]);
                setIsTyping(false);
            });
    }

    return (
        <MainContainer className='p-20'>
            <ChatContainer style={{
                height: '500px',

            }}>
                <ConversationHeader>
                    <Avatar
                        name="Maya - Your Personal Assistant"
                        src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
                    />
                    <ConversationHeader.Content
                        info="Active"
                        userName="Maya"
                    />
                </ConversationHeader>
                <MessageList
                    scrollBehavior="smooth"
                    typingIndicator={isTyping ? <TypingIndicator content="Maya is typing" /> : null}
                >
                    {messages.map((message, i) => (
                        <Message key={i} model={message} />
                    ))}
                </MessageList>
                <MessageInput placeholder="Type message here" onSend={handleSend} />
            </ChatContainer>
        </MainContainer>
    );
}

export default Chat;


