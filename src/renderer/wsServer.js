//Creating WebSocket
const server = require('http').createServer();
const webSocketServer = require('websocket').server;
const connections = [];
server.listen(process.env.PORT || 4000);
const wsServer = new webSocketServer({ httpServer: server });
//Join to websocket
wsServer.on('request', (request) => {
  const connection = request.accept(null, request.origin);
  connections.push(connection);
  //Listener for messages from websocket
  connection.on('message', (message) => {
    console.log('Recived message: ', message.utf8Data);
    connections.forEach((client) => {
      client.send(JSON.stringify(message));
    });
  });
  //Removing client when it left
  connection.on('close', () => {
    connections.filter((connect) => connect !== connection);
    console.log('Client left server');
  });
});
