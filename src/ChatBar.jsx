import React, {Component} from 'react';

class ChatBar extends Component {
  render() { console.log("CHAT BAR");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser} />
        <input onKeyDown={(event) => {
          if(event.key === 'Enter') {
            this.props.onNewMessage (event.target.value);
          }
        }} className="chatbar-message" placeholder="Type a message and hit ENTER"/>
      </footer>
    )
  }
}

export default ChatBar;
