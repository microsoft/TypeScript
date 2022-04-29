//// [contextualTyping24.ts]
var foo:(a:{():number; (i:number):number; })=>number; foo = function(this: void, a:string){return 5};

//// [contextualTyping24.js]
var foo;
foo = function (a) { return 5; };
