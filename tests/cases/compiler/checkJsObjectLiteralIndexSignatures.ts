// @allowJs: true
// @noImplicitAny: true
// @outDir: ./out
// @filename: file.js
// @ts-check

let n = Math.random();
let s = `${n}`;

const numericIndex = { [n]: 1 };
numericIndex[n].toFixed();

const stringIndex = { [s]: 1 };
stringIndex[s].toFixed();

