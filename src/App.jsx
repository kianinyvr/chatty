import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'
import NavBar from './NavBar.jsx'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
                currentUser: {name: "Bob"}, // optional.
                messages: [] //messages coming from server will be stored here
    }
    //Must do this to access state in react.
    this.addMessage = this.addMessage.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    //starting communication with server side
    this.socket = new WebSocket('ws://localhost:3001/');
    console.log("Connected to server");

    //receiving cmns from server
    this.socket.onmessage = (event) => {
      console.log("EVENT", event);
      const message = JSON.parse(event.data);
      if (message.type === 'incomingMessage' || message.type === 'notification') {
        const newMessages = this.state.messages.concat(message);
        console.log(newMessages)
        this.setState({
          messages: newMessages
        });
      }
      if (message.type === 'userCount') {
        this.setState({count: message.size})
      }

    }
  }

  onNameChange (username) {
    const previousName = this.state.currentUser.name;
    console.log("new value is ",username);
    this.setState({currentUser: { name: username }});
    const notification = {
          type: 'postNotifiction',
          username: null,
          content: `${previousName} changed their name to ${username}`
        };
    console.log(notification);
    this.socket.send(JSON.stringify(notification));
  }

  addMessage(data) {
    console.log("ADD MESSAGE");
    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content: data
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  render() {
    return (
      <main>
        <NavBar count={this.state.count}/>
        <MessageList messageInfo={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} onNewMessage = {this.addMessage}
          onNameChange={this.onNameChange} />
      </main>
    );
  }

}
export default App;
