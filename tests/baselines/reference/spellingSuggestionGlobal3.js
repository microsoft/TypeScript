//// [tests/cases/compiler/spellingSuggestionGlobal3.ts] ////

//// [spellingSuggestionGlobal3.ts]
const global = { x: true }
globals.x // should suggest `global` (GH#42209)


//// [spellingSuggestionGlobal3.js]
var global = { x: true };
globals.x; // should suggest `global` (GH#42209)
