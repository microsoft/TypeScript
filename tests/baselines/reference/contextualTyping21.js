//// [tests/cases/compiler/contextualTyping21.ts] ////

//// [contextualTyping21.ts]
var foo:{id:number;}[] = [{id:1}]; foo = [{id:1}, 1];

//// [contextualTyping21.js]
var foo = [{ id: 1 }];
foo = [{ id: 1 }, 1];
