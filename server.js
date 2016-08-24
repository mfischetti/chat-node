var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

app.use("/styles", express.static(__dirname + '/public/styles'));
app.use("/scripts", express.static(__dirname + '/public/scripts'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
}); 

io.on('connection', function(socket){
  socket.on('chatMessage', function(from, msg){
    io.emit('chatMessage', from, msg);
  });

  socket.emit('chatMessage', 'You have joined the chat!')
  socket.broadcast.emit('chatMessage', 'A user has connected to the chat.');

});

// Listen on env port for heroku or 3000 if locally
http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});