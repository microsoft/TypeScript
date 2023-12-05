//// [tests/cases/compiler/contextualTyping9.ts] ////

//// [contextualTyping9.ts]
var foo:{id:number;}[] = [{id:1}, {id:2, name:"foo"}];

//// [contextualTyping9.js]
var foo = [{ id: 1 }, { id: 2, name: "foo" }];
