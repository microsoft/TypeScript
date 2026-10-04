//// [tests/cases/compiler/contextualTyping13.ts] ////

//// [contextualTyping13.ts]
var foo:(a:number)=>number = function(a){return a};

//// [contextualTyping13.js]
"use strict";
var foo = function (a) { return a; };
