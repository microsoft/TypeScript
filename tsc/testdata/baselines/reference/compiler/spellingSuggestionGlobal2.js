//// [tests/cases/compiler/spellingSuggestionGlobal2.ts] ////

//// [spellingSuggestionGlobal2.ts]
export {}
declare global { const x: any }
const globals = { x: true }
global.x // should suggest `globals` (GH#42209)


//// [spellingSuggestionGlobal2.js]
const globals = { x: true };
global.x; // should suggest `globals` (GH#42209)
export {};
