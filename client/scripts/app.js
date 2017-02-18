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

  $(document).keypress(function(event) {
    if ((event.keyCode || event.which) === 13 ) {
      app.handleSubmit();
    }
  });
};

app.send = function (message) {
  $.ajax({
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
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
    // order: 'createdAt',
    data: 'order=-createdAt', 
    contentType: 'application/json',
    success: app.parseMessage,
  });
};

app.clearMessages = function () {
  $('#chats').empty();
};

app.parseMessage = function (messageArray) {
  // messageArray.forEach(app.renderMessage);
  app.clearMessages();  
  _.each(messageArray.results, app.renderMessage);
};

app.renderMessage = function (message) {
  // $('#chats').append('<p>' + message + '</p>');
  $('#chats').append(`<p class="chat"><a class="username">${message.username}: </a> ${message.text}</p>`);
};

app.renderRoom = function (room) {
  $('#roomSelect').append(`<option>${room}</option>`);
};


app.handleUsernameClick = function () {
  console.log('username clicked');
};

app.handleSubmit = function () {
  var message = {username: 'the Joker',
    text: $('.message')[0].value,
    roomname: 'lobby'
  };
  app.send(message);
  $('.message').val('');
};

app.init();

app.fetch();
setInterval(app.fetch, 5000);












