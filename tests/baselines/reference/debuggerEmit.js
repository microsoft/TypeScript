//// [debuggerEmit.ts]
var x = function () { debugger; }
x();

//// [debuggerEmit.js]
var x = function () { debugger; };
x();
