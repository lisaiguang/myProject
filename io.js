/**
 * Created by lenovo on 2015/9/5.
 */
var https = require('http').createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
});
var socket_io = new require('socket.io')(https);
socket_io.on('connection',function(socket){

});
module.exports = https;
//https.listen('3001');
