//// [spellingSuggestionGlobal1.ts]
export {}
declare global { const x: any }
global.x // should not suggest `global` (GH#42209)


//// [spellingSuggestionGlobal1.js]
"use strict";
exports.__esModule = true;
global.x; // should not suggest `global` (GH#42209)
