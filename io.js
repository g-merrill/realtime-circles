var io = require('socket.io')();

var players = {};

io.on('connection', socket => {
    socket.on('register-player', initials => {
        players[socket.id] = initials;
        io.emit('update-player-list', Object.values(players));
    });
    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('update-player-list', Object.values(players));
    });
    socket.on('add-circle', data => {
        io.emit('add-circle', data);
    });
    socket.on('clear-circles', () => {
        io.emit('clear-circles');
    });

});

module.exports = io;