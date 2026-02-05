//// [tests/cases/compiler/contextualTyping8.ts] ////

//// [contextualTyping8.ts]
var foo:{id:number;}[] = [<{id:number;}>({})];

//// [contextualTyping8.js]
"use strict";
var foo = [({})];
