/* Dependencies */
var express = require('express');
var http = require('http');
var fs = require('fs');

/* Configuration */
var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

/* Server Resources */
var app = express();
var server = http.createServer(app);
var users = { };

/* Helper functions */
var remove = function(arr, item) {
  var index = arr.indexOf(item);
  if (index !== -1) {
    arr.splice(index, 1);
  }
}

/* Socket.io connections */
var io = require('socket.io')(server);
io.on('connection', function(client) {
  console.log('Client connected from', client.handshake.address);

  client.on('join', function(room) {
    if (client.room) {
      if (client.room !== room) {
        remove(users[client.room], client.name);
        client.leave(client.room);
        client.room = room;
        client.join(room);
        if (!users[room]) {
          users[room] = [ client.name ];
        }
      }
    } else {
      client.room = room;
      client.join(room);
      if (!users[room]) {
        users[room] = [ ];
      }
    }
  });

  client.on('message', function(message) {
    io.to(client.room).emit('message', message);
  });

  client.on('name', function(name) {
    if (name) {
      remove(users[client.room], client.name);
      //If name is not taken, add to list
      if (users[client.room].indexOf(name) === -1) {
        users[client.room].push(name);
        io.to(client.room).emit('users', users[client.room]);
      }
      //If name change, notify
      if (client.name) {
        io.to(client.room).emit('message', client.name + ' is now known as ' + name);
      }
      client.name = name;
    }
  });

  client.on('disconnect', function() {
    console.log('Client', client.handshake.address, 'disconnected');
    if (client.name) {
      remove(users[client.room], client.name);
      io.to(client.room).emit('users', users[client.room]);
    }
  });
});

/* Set up routes */
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/static/', express.static(__dirname + '/static/'));

/* Server startup */
server.listen(config.port);
console.log('Server starting up on', config.port);
