import React, { useState, useEffect } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator, ConversationHeader, Avatar } from '@chatscope/chat-ui-kit-react';
import { ChatGroq } from '@langchain/groq'
import { SqlDatabase } from "langchain/sql_db";
import { createSqlAgent, SqlToolkit } from "langchain/agents/toolkits/sql";
import { DataSource } from 'typeorm';

const model = new ChatGroq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    model: "mixtral-8x7b-32768",
    temperature: 0.7,
    maxTokens: 1000,
});

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

    const runAgent = async (input) => {
        const datasource = new DataSource({
            type: 'sqlite',
            database: '../../test.db',
        })
        const db = await SqlDatabase.fromDataSourceParams({
            appDataSource: datasource,
            includesTables: ['employees']
        });
        const toolkit = new SqlToolkit(db, model);
        const executor = createSqlAgent(model, toolkit, { topK: 16494 });
        console.log(`Executing with input "${input}"...`);
        const result = await executor.invoke({ input });
        return result.output
    }
    const handleSend = async (message) => {
        console.log('message', message);
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
            const fetchedMessage = await runAgent(lastUserMessage);
            console.log('msg', fetchedMessage);
            const botMessage = {
                message: fetchedMessage,
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
