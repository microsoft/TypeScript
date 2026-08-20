//// [tests/cases/compiler/contextualTyping37.ts] ////

//// [contextualTyping37.ts]
var foo = <{ id: number; }[]>[{ foo: "s" }, {  }];

//// [contextualTyping37.js]
"use strict";
var foo = [{ foo: "s" }, {}];
