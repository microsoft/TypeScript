//// [tests/cases/compiler/spellingSuggestionModule.ts] ////

//// [spellingSuggestionModule.ts]
declare module "foobar" { export const x: number; }
foobar;

declare module 'barfoo' { export const x: number; }
barfoo;

declare module farboo { export const x: number; }
faroo;


//// [spellingSuggestionModule.js]
foobar;
barfoo;
faroo;
