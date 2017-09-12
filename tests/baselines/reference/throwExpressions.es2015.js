//// [throwExpressions.es2015.ts]
declare const condition: boolean;
const a = condition ? 1 : throw new Error();
const b = condition || throw new Error();
function c(d = throw new TypeError()) { }

const x = "x", y = "y", z = "z";
const w = condition ? throw true ? x : y : z;

//// [throwExpressions.es2015.js]
var __throw = (this && this.__throw) || function (e) { throw e; };
const a = condition ? 1 : __throw(new Error());
const b = condition || __throw(new Error());
function c(d = __throw(new TypeError())) { }
const x = "x", y = "y", z = "z";
const w = condition ? __throw(true) ? x : y : z;
