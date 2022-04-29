//// [contextualTyping23.ts]
var foo:(a:{():number; (i:number):number; })=>number; foo = function(a){return 5};

//// [contextualTyping23.js]
var foo;
foo = function (a) { return 5; };
