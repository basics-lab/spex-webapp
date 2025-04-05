import { type } from '@testing-library/user-event/dist/type';
import React, { useState, useEffect } from 'react';

import ReactMarkdown from 'react-markdown';

const Chatbox = ({ prompt, response }) => {
    var [currentPrompt, setCurrentPrompt] = useState(prompt);
    var [currentResponse, setCurrentResponse] = useState(response);

    useEffect(() => {
        setCurrentPrompt(String(prompt));
        setCurrentResponse(String(response));
    }, [prompt, response]);

    if (!currentResponse) {
        currentResponse = "Loading...";
    }
    if (!currentPrompt) {
        currentPrompt = "Loading...";
    }

    console.log("current prompt", currentPrompt);
    console.log("type of current prompt", typeof currentPrompt);

    return (
        <div className="chatbox">
            <div className="messages">
                <div className="user_message">
                    <div className="message_title">Prompt</div>
                    <ReactMarkdown>{currentPrompt}</ReactMarkdown>
                </div>
                <div className="bot_message">
                    <div className="message_title" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={`${process.env.PUBLIC_URL}/assets/meta-logo.png`} alt="Llama-3.2 Logo" style={{ height: '15px', marginRight: '5px' }}  /> Llama-3.2
                    </div>
                    <ReactMarkdown>{currentResponse}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default Chatbox;