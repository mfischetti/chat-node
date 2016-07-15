var socket = io(); 

function submitfunction(){
  var message = $('#m').val();
  if(message != '') {
    socket.emit('chatMessage', message);
}
$('#m').val('').focus();
  return false;
}
socket.on('chatMessage', function(msg){
  $('#messages').append($('<li>').text(msg));
});

 
