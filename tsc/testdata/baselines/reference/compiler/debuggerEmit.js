//// [tests/cases/compiler/debuggerEmit.ts] ////

//// [debuggerEmit.ts]
var x = function () { debugger; }
x();

//// [debuggerEmit.js]
"use strict";
var x = function () { debugger; };
x();
