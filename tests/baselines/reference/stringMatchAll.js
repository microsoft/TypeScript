//// [tests/cases/compiler/stringMatchAll.ts] ////

//// [stringMatchAll.ts]
const matches = "matchAll".matchAll(/\w/g);
const array = [...matches];
const { index, input } = array[0];


//// [stringMatchAll.js]
const matches = "matchAll".matchAll(/\w/g);
const array = [...matches];
const { index, input } = array[0];
