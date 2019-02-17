// make connection
var socket = io.connect('http://localhost:4000');

// query DOM
var message = document.getElementById('message'),
  handle = document.getElementById('handle'),
  btn = document.getElementById('send'),
  output = document.getElementById('output'),
  feeback = document.getElementById('feedback');

// emit events 
btn.addEventListener('click', function () {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
});

message.addEventListener('keypress', function () {
  socket.emit('typing', handle.value);
});

// listen for events
socket.on('chat', function (data) {
  feeback.innerHTML = '';
  output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;
});

socket.on('typing', function (name) {
  feeback.innerHTML = `<p><em>${name} is typing a message...</em></p>`;
});