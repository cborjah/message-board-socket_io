const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackConfig = require('./webpack.config.js');

const app = express();
const server = http.createServer(app); // ** Need to create an http server. This is for socket.io. **
const io = socketIo(server); // Create a new instance of socket.io and hands it the web server that was created to bind to it.

app.use(express.static(__dirname + '/public')); // Serves static files from a directory
// app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(bodyParser.urlencoded({ extended: false }));

io.on('connection', socket => { // the 'connection' event happens whenever a new web socket connects to the server.
  socket.on('message', body => { // tells that socket to listen for message events
    socket.broadcast.emit('message', {
      body,
      from: socket.id.slice(8)
    })
  })
})

// ** Normally you would listen on app if your doing express. But if you do that everything will work but your sockets will not
// be connected. You MUST start on the server, NOT on the app itself. **
server.listen(3000, () => {
  console.log("Listening on port 3000...");
});
