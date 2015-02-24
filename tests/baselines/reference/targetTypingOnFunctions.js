//// [targetTypingOnFunctions.ts]
var fu: (s: string) => string = function (s) { return s.toLowerCase() };

var zu = fu = function (s) { return s.toLowerCase() };

//// [targetTypingOnFunctions.js]
var fu = function (s) { return s.toLowerCase(); };
var zu = fu = function (s) { return s.toLowerCase(); };
