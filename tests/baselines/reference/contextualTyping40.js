//// [contextualTyping40.ts]
var foo = <{():number; (i:number):number; }> function(){return 1;};

//// [contextualTyping40.js]
var foo = function () { return 1; };
