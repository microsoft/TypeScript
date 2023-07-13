//// [tests/cases/compiler/spellingSuggestionGlobal4.ts] ////

//// [spellingSuggestionGlobal4.ts]
export {}
declare global { var x: any }
global.x // should not suggest `global` (GH#42209)


//// [spellingSuggestionGlobal4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
global.x; // should not suggest `global` (GH#42209)
