//// [tests/cases/compiler/spellingSuggestionGlobal1.ts] ////

//// [spellingSuggestionGlobal1.ts]
export {}
declare global { const x: any }
global.x // should not suggest `global` (GH#42209)


//// [spellingSuggestionGlobal1.js]
global.x; // should not suggest `global` (GH#42209)
export {};
