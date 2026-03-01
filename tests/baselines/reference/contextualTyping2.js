//// [tests/cases/compiler/contextualTyping2.ts] ////

//// [contextualTyping2.ts]
var foo: {id:number;} = {id:4, name:"foo"};

//// [contextualTyping2.js]
"use strict";
var foo = { id: 4, name: "foo" };
