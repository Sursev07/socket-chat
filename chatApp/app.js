const app = require('express')()
const http = require('http').createServer(app);
const port = 3000
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})


http.listen(port, function(){
    console.log(`listening on port ${port}`)
})

io.on('connection', function(socket){
    console.log('user connected hiii')
    socket.on('disconnect', function(){
        console.log('user disconnected')
    })

    socket.on('created', (data) => {
        //io.emit('created', 'ioo')
        socket.broadcast.emit('created', 'socket')
    })

    socket.on('chat-message', (data) => {
        socket.broadcast.emit('chat-message', data)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })

    socket.on('stop-typing', (data) => {
        socket.broadcast.emit('stop-typing', data)
    })
})


   