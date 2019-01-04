import React, { Component } from 'react';
//import Pusher from 'pusher-js';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userMessage: '',
            conversation: [],
        };
    }

    componentDidMount() {
        // const pusher = new Pusher('727f670f81b341315051', {
        //     cluster: 'ap2',
        //     encrypted: true,
        // });

        // const channel = pusher.subscribe('bot');
        // channel.bind('bot-response', data => {
            fetch('https://api.dialogflow.com/v1/query?v=20150910', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization': 'Bearer 2feca599d3d0492e88ded23d7a18744f' },
            body: JSON.stringify({
                query: 'name?',//this.state.userMessage,
                lang: 'en', 
                sessionId: '12345asfg'
            }),
        }).then(results => { return results.json();}).then(data => { console.log(data);});
            const msg = {
                text: 'there?',
                user: 'ai',
            };
            this.setState({
                conversation: [...this.state.conversation, msg],
            });
       // });
    }

    handleChange = event => {
        this.setState({ userMessage: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        if (!this.state.userMessage.trim()) return;

        const msg = {
            text: this.state.userMessage,
            user: 'human',
        };

        this.setState({
            conversation: [...this.state.conversation, msg],
        });

        fetch('https://api.dialogflow.com/v1/query?v=20150910', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization': 'Bearer 2feca599d3d0492e88ded23d7a18744f' },
            body: JSON.stringify({
                query: this.state.userMessage,
                lang: 'en', 
                sessionId: '12345asfg'
            }),
        });

        this.setState({ userMessage: '' });
    };

    render() {
        const ChatBubble = (text, i, className) => {
            return (
                <div key={`${className}-${i}`} className={`${className} chat-bubble`}>
        <span className="chat-content">{text}</span>
                </div>
        );
        };

        const chat = this.state.conversation.map((e, index) =>
            ChatBubble(e.text, index, e.user)
        );

        return (
            <div>
            <h1>React Chatbot</h1>
        <div className="chat-window">
            <div className="conversation-view">{chat}</div>
            <div className="message-box">
            <form onSubmit={this.handleSubmit}>
    <input
        value={this.state.userMessage}
        onInput={this.handleChange}
        className="text-input"
        type="text"
        autoFocus
        placeholder="Type your message and hit Enter to send"
            />
            </form>
            </div>
            </div>
            </div>
    );
    }
}

export default App;