//// [tests/cases/compiler/contextualTyping26.ts] ////

//// [contextualTyping26.ts]
function foo(param:{id:number;}){}; foo(<{id:number;}>({}));

//// [contextualTyping26.js]
"use strict";
function foo(param) { }
;
foo(({}));
