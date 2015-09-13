var fs = require("fs");
var str = fs.readFileSync(__dirname + (process.env.NODE_ENV == 'production' ? '/production.txt' : '/development.txt'), 'utf8');
var settings = JSON.parse(str);
var client = redis.createClient(settings.port,settings.server.host,{auth_pass:settings.pass});
module.exports = client;
client.on("ready", function () {
    require('../event-bus/event-bus').emit('redis ready');
});
client.on("error", function () {
    require('../event-bus/event-bus').emit('redis ready');
});