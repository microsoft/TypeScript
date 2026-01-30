//// [tests/cases/compiler/checkJsObjectLiteralIndexSignatures.ts] ////

//// [file.js]
// @ts-check

let n = Math.random();
let s = `${n}`;

const numericIndex = { [n]: 1 };
numericIndex[n].toFixed();

const stringIndex = { [s]: 1 };
stringIndex[s].toFixed();



//// [file.js]
// @ts-check
let n = Math.random();
let s = `${n}`;
const numericIndex = { [n]: 1 };
numericIndex[n].toFixed();
const stringIndex = { [s]: 1 };
stringIndex[s].toFixed();
