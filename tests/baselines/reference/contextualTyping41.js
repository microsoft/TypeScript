//// [tests/cases/compiler/contextualTyping41.ts] ////

//// [contextualTyping41.ts]
var foo = <{():number; (i:number):number; }> (function(){return "err";});

//// [contextualTyping41.js]
"use strict";
var foo = (function () { return "err"; });
