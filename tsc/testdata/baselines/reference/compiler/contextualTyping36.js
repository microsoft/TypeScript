//// [tests/cases/compiler/contextualTyping36.ts] ////

//// [contextualTyping36.ts]
var foo = <{ id: number; }[]>[{ id: 4 }, <{ id: number; }>({  })];

//// [contextualTyping36.js]
"use strict";
var foo = [{ id: 4 }, ({})];
