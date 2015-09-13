var fs = require("fs");
var str = fs.readFileSync(__dirname + (process.env.NODE_ENV == 'production' ? '/production.txt' : '/development.txt'), 'utf8');
module.exports = JSON.parse(str);