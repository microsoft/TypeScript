//// [stringPropertyAccess.ts]
var x = '';
var a = x.charAt(0);
var b = x.hasOwnProperty('charAt');

var c = x['charAt'](0);
var e = x['hasOwnProperty']('toFixed');

//// [stringPropertyAccess.js]
var x = '';
var a = x.charAt(0);
var b = x.hasOwnProperty('charAt');
var c = x['charAt'](0);
var e = x['hasOwnProperty']('toFixed');
