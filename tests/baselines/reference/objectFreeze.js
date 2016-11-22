//// [objectFreeze.ts]
const f = Object.freeze(function foo(a: number, b: string) { return false; });
f(1, "") === false;

const a = Object.freeze([1, 2, 3]);
a[0] = 1;

const o = Object.freeze({ a: 1, b: "string" });
o.b = "another";


//// [objectFreeze.js]
var f = Object.freeze(function foo(a, b) { return false; });
f(1, "") === false;
var a = Object.freeze([1, 2, 3]);
a[0] = 1;
var o = Object.freeze({ a: 1, b: "string" });
o.b = "another";
