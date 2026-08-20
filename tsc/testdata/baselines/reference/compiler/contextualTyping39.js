//// [tests/cases/compiler/contextualTyping39.ts] ////

//// [contextualTyping39.ts]
var foo = <{ (): number; }> function() { return "err"; };

//// [contextualTyping39.js]
"use strict";
var foo = function () { return "err"; };
