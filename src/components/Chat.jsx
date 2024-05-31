import React, { useState, useEffect } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator, ConversationHeader, Avatar } from '@chatscope/chat-ui-kit-react';
import axios from 'axios';

function Chat() {
    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm Cassie! I can provide you with insights from the data.",
            sentTime: "just now",
            direction: 'incoming',
            sender: "Cassie"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (message) => {
        //console.log('message', message);
        const newMessage = {
            message: message,
            direction: 'outgoing',
            sender: "user"
        };
        const newMessages = [...messages, newMessage];

        setMessages(newMessages);
        setIsTyping(true);
        await processMessageToSQLAgent(newMessages);
    };

    const processMessageToSQLAgent = async (chatMessages) => {
        const lastUserMessage = chatMessages.filter(msg => msg.sender === 'user').slice(-1)[0].message;
        console.log('lastUserMessage', lastUserMessage);
        try {
            const response = await axios.post('https://cassie.onrender.com/query', { input: lastUserMessage });
            //const res = await response.json;
            console.log('msg', response.data.output);
            const botMessage = {
                message: response.data.output,
                sender: "Cassie",
                direction: 'incoming',
            };
            setMessages([...chatMessages, botMessage]);
        } catch (error) {
            console.error('Error executing query:', error);
            const errorMessage = {
                message: 'An error occurred while processing your request.',
                sender: "Cassie",
                direction: 'incoming',
            };
            setMessages([...chatMessages, errorMessage]);
        }
        setIsTyping(false);
    }

    return (
        <MainContainer className='p-20'>
            <ChatContainer style={{
                height: '500px',

            }}>
                <ConversationHeader>
                    <Avatar
                        name="Cassie - Your Personal Assistant"
                        src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
                    />
                    <ConversationHeader.Content
                        info="Active"
                        userName="Cassie"
                    />
                </ConversationHeader>
                <MessageList
                    scrollBehavior="smooth"
                    typingIndicator={isTyping ? <TypingIndicator content="Cassie is typing" /> : null}
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
