//// [tests/cases/compiler/objectFreeze.ts] ////

//// [objectFreeze.ts]
const f = Object.freeze(function foo(a: number, b: string) { return false; });
f(1, "") === false;

class C { constructor(a: number) { } }
const c = Object.freeze(C);
new c(1);

const a = Object.freeze([1, 2, 3]);
a[0] = a[2].toString();

const o = Object.freeze({ a: 1, b: "string", c: true });
o.b = o.a.toString();


//// [objectFreeze.js]
var f = Object.freeze(function foo(a, b) { return false; });
f(1, "") === false;
var C = /** @class */ (function () {
    function C(a) {
    }
    return C;
}());
var c = Object.freeze(C);
new c(1);
var a = Object.freeze([1, 2, 3]);
a[0] = a[2].toString();
var o = Object.freeze({ a: 1, b: "string", c: true });
o.b = o.a.toString();
