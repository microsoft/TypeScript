//// [tests/cases/compiler/commentInMethodCall.ts] ////

//// [commentInMethodCall.ts]
//comment here
var s: string[];
s.map(// do something
    function () { });


//// [commentInMethodCall.js]
"use strict";
//comment here
var s;
s.map(// do something
function () { });
