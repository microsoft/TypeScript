var fs = require('fs');
var tls = require('tls');

console.log(fs.readFileSync(__dirname + '/x.txt', 'utf8'));
