//// [tests/cases/compiler/contextualTyping31.ts] ////

//// [contextualTyping31.ts]
function foo(param:number[]){}; foo([1]);

//// [contextualTyping31.js]
"use strict";
function foo(param) { }
;
foo([1]);
