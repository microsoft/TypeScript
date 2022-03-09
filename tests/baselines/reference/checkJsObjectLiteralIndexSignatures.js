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
var _a, _b;
var n = Math.random();
var s = "".concat(n);
var numericIndex = (_a = {}, _a[n] = 1, _a);
numericIndex[n].toFixed();
var stringIndex = (_b = {}, _b[s] = 1, _b);
stringIndex[s].toFixed();
