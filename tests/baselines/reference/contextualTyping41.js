//// [contextualTyping41.ts]
var foo = <{():number; (i:number):number; }> (function(){return "err";});

//// [contextualTyping41.js]
var foo = (function () { return "err"; });
