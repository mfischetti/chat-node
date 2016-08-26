var socket = io(); 

function submitfunction(){
  var message = $('#m').val();
  if(message != '') {
    socket.emit('chatMessage', message);
}

$('#m').val('').focus();
  return false;
}

//when user first connects prompt for username
socket.on('connect', function(){
		socket.emit('userJoin', prompt("Welcome to the Node Chat App. Please enter a username."));
	});

socket.on('chatMessage', function(msg){
  $('#messages').append('<li>' + msg.name + ': ' + msg.text );

});

 
