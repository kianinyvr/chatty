import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    console.log(this.props.messageInfo)
    return(
      <main className="messages">
      {this.props.messageInfo.map((item) => {
          return <Message name={item.username} message={item.content} key={item.id} type={item.type} />
        })
      }
      </main>
    )
  }
}

export default MessageList;