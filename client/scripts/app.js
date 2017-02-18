// YOUR CODE HERE:
//http://parse.sfm6.hackreactor.com/

// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };


var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages'
};

app.init = function () {
  // $(document).on('submit', '#send .submit', app.handleSubmit);
  $(document).on('click', '.username', app.handleUsernameClick);
  $(document).on('click', '#send .submit', app.handleSubmit);
  //$(document).submit(app.handleSubmit);

  // $('#send .submit').submit(app.handleSubmit);
};

app.send = function (message) {
  $.ajax({
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'jsonp',
    success: function (data) {
      console.log('chatterbox: Message sent', data);
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });

};

app.fetch = function () {
  $.ajax({
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    // data: 
    contentType: 'jsonp',
    success: app.parseMessage,
  });
};

app.clearMessages = function () {
  $('#chats').empty();
};

app.parseMessage = function (messageArray) {
  console.log('messages recieved');
  // messageArray.forEach(app.renderMessage);
  app.clearMessages();  
  _.each(messageArray.results, app.renderMessage);
};

app.renderMessage = function (message) {
  // $('#chats').append('<p>' + message + '</p>');
  $('#chats').append(`<p class="chat"><a class="username">${message.username}: </a> ${message.text}</p>`);
};

app.renderRoom = function (room) {
  $('#roomSelect').append(`<section>${room}</section>`);
};


app.handleUsernameClick = function () {
  console.log('username clicked');
};

app.handleSubmit = function () {
  var message = {username: 'Jeff',
    text: $('.message')[0].value,
    roomname: 'lobby'
  };
  console.log(message);
  app.send(message);
  // return false;
};

app.init();

app.fetch();
setInterval(app.fetch, 5000);












