//// [tests/cases/compiler/contextualTyping40.ts] ////

//// [contextualTyping40.ts]
var foo = <{():number; (i:number):number; }> function(){return 1;};

//// [contextualTyping40.js]
"use strict";
var foo = function () { return 1; };
