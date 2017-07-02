// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuid = require('uuid/v4');
uuid(); // RESULT

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
//Ready to receive websockets
const wss = new WebSocket.Server({ server });

// Broadcast to all.
function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}
//Count the number of users
function broadcastCount() {
  const message = {
                  type: 'userCount',
                  size: wss.clients.size,
                  }
  console.log("COUNT", message);
  broadcast(JSON.stringify(message));
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  broadcastCount(); //check to see how many users connected
  ws.on('message', function incoming(message) {
    const incomingMsg = JSON.parse(message);
    incomingMsg.id = uuid();
    if(incomingMsg.username){
      incomingMsg.type = "incomingMessage";
    } else{
      incomingMsg.type = "notification";
    }
    broadcast(JSON.stringify(incomingMsg));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {console.log('Client disconnected')
    broadcastCount()
  });
});