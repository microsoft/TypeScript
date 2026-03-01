//// [tests/cases/compiler/contextualTyping38.ts] ////

//// [contextualTyping38.ts]
var foo = <{ (): number; }> function(a) { return a };

//// [contextualTyping38.js]
"use strict";
var foo = function (a) { return a; };
