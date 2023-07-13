//// [tests/cases/compiler/contextualTyping18.ts] ////

//// [contextualTyping18.ts]
var foo: {id:number;} = <{id:number;}>({ }); foo = {id: 5};

//// [contextualTyping18.js]
var foo = ({});
foo = { id: 5 };
