import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'


class App extends Component {
  // in App.jsx
  componentDidMount() {
    console.log("componentDidMount <App />");
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    // more code here..
  }
  constructor(props) {
    super(props);
    this.state = {


                currentUser: {name: "Bob"}, // optional.

                  messages: [
                    {
                      id: 1,
                      username: "Bob",
                      content: "Has anyone seen my marbles?",
                    },

                    {
                      id: 2,
                      username: "Anonymous",
                      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
                    }
                  ]
    }
    //Must do this to access state in react.
    this.addMessage = this.addMessage.bind(this);
  }

  addMessage(item) {
    this.setState({message: this.state.messsages.push(item)});
  }


  render() { console.log("APP");
    return (
      <main>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messageInfo={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} />
      </main>
    );
  }
}



export default App;
