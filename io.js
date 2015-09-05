/**
 * Created by lenovo on 2015/9/5.
 */
define(function(){
    var https = require('http').createServer(function (request, response) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Hello World\n');
    });
    var socket_io = new require('socket.io')(https);
    https.listen('3000');
    socket_io.on('connection',function(socket){

    })
},module);