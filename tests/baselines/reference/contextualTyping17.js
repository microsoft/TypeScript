//// [tests/cases/compiler/contextualTyping17.ts] ////

//// [contextualTyping17.ts]
var foo: {id:number;} = {id:4}; foo = {id: 5, name:"foo"};

//// [contextualTyping17.js]
var foo = { id: 4 };
foo = { id: 5, name: "foo" };
