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

//listens to clients userJoin function to add username
io.on('connection', function(socket){
  socket.on('userJoin', function(username){
    socket.username = username;	
    console.log('User: ' + socket.username + ' has connected');
    
    socket.broadcast.emit('chatMessage', {
      name: 'System',
      text: socket.username + ' has joined the chat!'
    });
    
    socket.emit('chatMessage', {
      name: 'System',
      text: 'You have joined the chat!'
    });
  });

  socket.on('chatMessage', function(msg){
    io.emit('chatMessage', {
      name: socket.username,
      text: msg
    });
    console.log('User:' + socket.username + ' Message:'+msg);
  });

  //function when user disconnects from chat
  socket.on('disconnect', function(){
    console.log(socket.username + ' has disconnected');
    socket.broadcast.emit('chatMessage', {
      name: 'System',
      text: socket.username + ' has disconnected'
    });
  });
});

// Listen on env port for heroku or 3000 if locally
http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});