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
  socket.on('chatMessage', function(msg){
    io.emit('chatMessage', msg);
  });
});

// Listen on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});