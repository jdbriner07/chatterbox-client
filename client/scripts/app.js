// YOUR CODE HERE:
//http://parse.sfm6.hackreactor.com/

var app = {
  server: 'http://parse.sfm6.hackreactor.com/'
};

app.init = function () {
  $(document).on('click', '.username', app.handleUsernameClick);
  // $(document).on('submit', '#send .submit', app.handleSubmit);
  $('#send .submit').submit(app.handleSubmit);
};

app.send = function (message) {
  $.ajax({
    url: 'http://parse.sfm6.hackreactor.com/',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });

};

app.fetch = function () {
  $.ajax({
    url: 'http://parse.sfm6.hackreactor.com/',
    type: 'GET',
    // data: 
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
  });
};

app.clearMessages = function () {
  $('#chats').empty();
};

app.renderMessage = function (message) {
  // $('#chats').append('<p>' + message + '</p>');
  $('#chats').append(`<p class="username">${message}</p>`);

};

app.renderRoom = function (room) {
  $('#roomSelect').append(`<section>${room}</section>`);
};


app.handleUsernameClick = function () {

};

app.handleSubmit = function () {

}














