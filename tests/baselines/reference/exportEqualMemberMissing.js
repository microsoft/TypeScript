//// [exportEqualMemberMissing_0.js]
var server;
module.exports = server;
//// [exportEqualMemberMissing_1.js]
///<reference path='exportEqualMemberMissing_0.ts'/>
var connect = require('exportEqualMemberMissing_0');
connect().use(connect.static('foo')); // Error	1	The property 'static' does not exist on value of type ''.
