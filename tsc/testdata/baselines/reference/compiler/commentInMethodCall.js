//// [tests/cases/compiler/commentInMethodCall.ts] ////

//// [commentInMethodCall.ts]
//commment here
var s: string[];
s.map(// do something
    function () { });


//// [commentInMethodCall.js]
"use strict";
//commment here
var s;
s.map(// do something
function () { });
