// @strict: true
// @checkOrder: default, typesfirst

declare const b: boolean;
let x;
x = { a: 1 };
let arr = [];
arr.push(x); // regular copy of the literal
const y = x; // widened copy of the literal
const z = b ? (b ? arr[0] : y) : { c: 1 };
