//// [tests/cases/compiler/contextualTyping25.ts] ////

//// [contextualTyping25.ts]
function foo(param:{id:number;}){}; foo(<{id:number;}>({}));

//// [contextualTyping25.js]
function foo(param) { }
;
foo(({}));
