//// [tests/cases/compiler/contextualTyping7.ts] ////

//// [contextualTyping7.ts]
var foo:{id:number;}[] = [<{id:number;}>({})];

//// [contextualTyping7.js]
var foo = [({})];
