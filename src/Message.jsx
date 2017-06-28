import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("MESSAGE");
    return (
      <div className="message">
        <span className="message-username">{this.props.name}</span>
        <span className="message-content">{this.props.message}
        </span>
      </div>



    )
  }
}

export default Message;



/*
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
*/