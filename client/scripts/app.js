// YOUR CODE HERE:
//http://parse.sfm6.hackreactor.com/

// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };

// THINGS FOR LATER
// trolling
// persistant dropdown menu for chatrooms
// function to pull all messages
// HTML/CSS layout
// security


var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  friends: {}
};

app.init = function () {
  $(document).on('click', '.username', app.handleUsernameClick);
  $(document).on('click', '#send .submit', app.handleSubmit);
  $(document).on('click', '.newRoom', app.renderRoom);
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

app.fetchRoom = function () {
  var room = $('.roomSelect')[0].value;
  $.ajax({
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: 'order=-createdAt',
    data: `where={"roomname":"${room}"}`,
    contentType: 'application/json',
    success: app.parseMessage,
  });
};

app.fetchAll = function () {
  $.ajax({
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: 'order=-createdAt',
    contentType: 'application/json',
    success: app.parseMessage,
  });
};

app.fetch = function () {
  var room = $('.roomSelect')[0].value;
  room === 'all' ? app.fetchAll() : app.fetchRoom();
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
  if (!!app.friends[message.username]) {
    $('#chats').append(`<p class="chat"><a class="username friend">${message.username}</a>: ${message.text}</p>`);
  } else {
    $('#chats').append(`<p class="chat"><a class="username">${message.username}</a>: ${message.text}</p>`);
  }
};

app.renderRoom = function () {
  var roomName = $('.roomName')[0].value;
  $('.roomSelect').append(`<option>${roomName}</option>`);
  $('.roomName').val('');
};

app.handleUsernameClick = function () {
  if (!!app.friends[$(this)[0].text]) {
    delete app.friends[$(this)[0].text];
  } else {
    app.friends[$(this)[0].text] = $(this)[0].text;
  }
  app.fetch();
};

app.handleSubmit = function () {
  var message = {username: window.location.search.slice(10),
    text: $('.message')[0].value,
    roomname: $('.roomSelect')[0].value
  };
  app.send(message);
  $('.message').val('');
};

app.init();
app.fetch();
setInterval(app.fetch, 3000);
