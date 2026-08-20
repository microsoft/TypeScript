//// [tests/cases/compiler/contextualTyping28.ts] ////

//// [contextualTyping28.ts]
function foo(param:number[]){}; foo([1]);

//// [contextualTyping28.js]
"use strict";
function foo(param) { }
;
foo([1]);
