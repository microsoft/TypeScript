//// [tests/cases/compiler/contextualTyping13.ts] ////

//// [contextualTyping13.ts]
var foo:(a:number)=>number = function(a){return a};

//// [contextualTyping13.js]
var foo = function (a) { return a; };
