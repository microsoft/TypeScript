//// [tests/cases/compiler/contextualTyping19.ts] ////

//// [contextualTyping19.ts]
var foo:{id:number;}[] = [{id:1}]; foo = [{id:1}, {id:2}];

//// [contextualTyping19.js]
var foo = [{ id: 1 }];
foo = [{ id: 1 }, { id: 2 }];
