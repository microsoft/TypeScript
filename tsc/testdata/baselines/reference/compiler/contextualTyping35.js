//// [tests/cases/compiler/contextualTyping35.ts] ////

//// [contextualTyping35.ts]
var foo = <{ id: number;}> {id:4, name: "as"};

//// [contextualTyping35.js]
"use strict";
var foo = { id: 4, name: "as" };
