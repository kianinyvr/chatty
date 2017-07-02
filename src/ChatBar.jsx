import React, {Component} from 'react';

class ChatBar extends Component {

  handleNameChange(event) {
    if (event.key === 'Enter'){
      this.props.onNameChange(event.target.value);
    }
  }

  handleMessage(event) {
    if (event.key === 'Enter') {
      this.props.onNewMessage(event.target.value);
    }
  }

  render() { console.log("CHAT BAR");
    return (
      <footer className="chatbar">

        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser}
        onKeyDown={this.handleNameChange.bind(this)}/>

        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown={this.handleMessage.bind(this)}/>
      </footer>
    )
  }
}

export default ChatBar;
