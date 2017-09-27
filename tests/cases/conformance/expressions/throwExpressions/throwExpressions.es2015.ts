// @target: es2015
// @experimentalThrowExpressions: true
declare const condition: boolean;
const a = condition ? 1 : throw new Error();
const b = condition || throw new Error();
function c(d = throw new TypeError()) { }

const x = "x", y = "y", z = "z";
const w = condition ? throw true ? x : y : z;