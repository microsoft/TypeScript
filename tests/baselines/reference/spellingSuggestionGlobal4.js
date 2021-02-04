//// [spellingSuggestionGlobal4.ts]
export {}
declare global { var x: any }
global.x // should not suggest `global` (GH#42209)


//// [spellingSuggestionGlobal4.js]
"use strict";
exports.__esModule = true;
global.x; // should not suggest `global` (GH#42209)
