//// [tests/cases/compiler/contextualTyping22.ts] ////

//// [contextualTyping22.ts]
var foo:(a:number)=>number = function(a){return a}; foo = function(b){return b};

//// [contextualTyping22.js]
var foo = function (a) { return a; };
foo = function (b) { return b; };
