//// [tests/cases/compiler/contextualTyping6.ts] ////

//// [contextualTyping6.ts]
var foo:{id:number;}[] = [{id:1}, {id:2}];

//// [contextualTyping6.js]
"use strict";
var foo = [{ id: 1 }, { id: 2 }];
