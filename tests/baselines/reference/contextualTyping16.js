//// [tests/cases/compiler/contextualTyping16.ts] ////

//// [contextualTyping16.ts]
var foo: {id:number;} = {id:4}; foo = {id:5};

//// [contextualTyping16.js]
"use strict";
var foo = { id: 4 };
foo = { id: 5 };
