import React, { useState, useEffect } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator, ConversationHeader, Avatar } from '@chatscope/chat-ui-kit-react';
import { fetchData } from './data';

// const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const API_KEY = 'your_api_key_here'

const systemMessage = {
    "role": "system",
    "content": "Explain things like you're talking to a software professional with 2 years of experience."
};

// const data = await fetchData();
// const data = [
//     {
//         "year": 2024,
//         "experience_level": "MI",
//         "employment_type": "FT",
//         "job_title": "Data Scientist",
//         "salary_in_usd": 120000,
//         "salary_currency": "USD",
//         "salary": 120000,
//         "employee_residence": "AU",
//         "remote_ratio": 0,
//         "company_location": "AU",
//         "company_size": "S"
//     },
//     // ... other data rows
// ];

async function fetchInitialData() {
    const data = await fetchData();
    return data;
}

function Chat() {
    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm ChatGPT! Ask me anything!",
            sentTime: "just now",
            direction: 'incoming',
            sender: "ChatGPT"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function loadData() {
            const initialData = await fetchInitialData();
            setData(initialData);
        }
        loadData();
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
            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role: role, content: messageObject.message };
        });

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages,
                {
                    role: "system",
                    content: `Use the following data to help answer questions: ${JSON.stringify(data)}`
                }
            ],
            "temperature": 0.7,
            "max_tokens": 150,
            "n": 1,
            "stop": null,
            "presence_penalty": 0.6,
            "frequency_penalty": 0.0
        };

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            setMessages([...chatMessages, {
                message: data.choices[0].message.content,
                direction: 'incoming',
                sender: "ChatGPT"
            }]);
            setIsTyping(false);
        });
    }

    return (
        // <div className="App flex justify-center p-20">
        // <div className='hero min-h-screen'>
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
                    typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
                >
                    {messages.map((message, i) => (
                        <Message key={i} model={message} />
                    ))}
                </MessageList>
                <MessageInput placeholder="Type message here" onSend={handleSend} />
            </ChatContainer>
        </MainContainer>
        // </div>
        // </div>
    );
}

export default Chat;
