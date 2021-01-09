const socketio = require('socket.io');



const io = require('socket.io')(8083, {
    transports: ['websocket'],
    path: `/pmapi/socket.io`,
});
io.use((socket, next) => {
    console.log('socket io use')
    next();
});
//const io = baseIo.of(consts.apiRoot);
io.on('connection', function (socket) {
    console.log('connection');
    socket.on('ggFreeFormMsg', msg => {
        socket.broadcast.emit('ggFreeFormMsg', msg);
    })
    socket.on('disconnect', () => {
        console.log('socket disconnect')
    })
    socket.on('connect_failed', function () {
        console.log("Sorry, there seems to be an issue with the connection!");
    })
    //socket.on('chat message', function (msg) {
    //    console.log('got chat msg ' + msg);
    //    io.emit('chat message srv', msg + (new Date()).toISOString());
    //});
});