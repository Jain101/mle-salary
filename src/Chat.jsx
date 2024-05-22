import React, { useState, useEffect } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator, ConversationHeader, Avatar } from '@chatscope/chat-ui-kit-react';


// const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const API_KEY = "YOUR_API_KEY";

const systemMessage = {
    "role": "system",
    "content": "Explain things like you're talking to a software professional with 2 years of experience."
};

const data = [
    {
        "year": 2024,
        "experience_level": "MI",
        "employment_type": "FT",
        "job_title": "Data Scientist",
        "salary_in_usd": 120000,
        "salary_currency": "USD",
        "salary": 120000,
        "employee_residence": "AU",
        "remote_ratio": 0,
        "company_location": "AU",
        "company_size": "S"
    },
];

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
        <div className="App flex justify-center p-20">
            <div style={{ position: "relative", height: "min-content", width: "700px" }}>
                <MainContainer>
                    <ChatContainer>
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
            </div>
        </div>
    );
}

export default Chat;
