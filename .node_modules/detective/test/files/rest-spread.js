var a = require('a');
var b = require('b');
var c = require('c');


var obj = { foo: 'bar', bee: 'bop' }
var spread = { ...obj }
var { foo, ...rest } = obj

