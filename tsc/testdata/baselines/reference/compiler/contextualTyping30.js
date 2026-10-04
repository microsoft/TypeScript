//// [tests/cases/compiler/contextualTyping30.ts] ////

//// [contextualTyping30.ts]
function foo(param:number[]){}; foo([1, "a"]);

//// [contextualTyping30.js]
"use strict";
function foo(param) { }
;
foo([1, "a"]);
