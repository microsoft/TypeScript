//// [tests/cases/conformance/es6/Symbols/symbolProperty10.ts] ////

//// [symbolProperty10.ts]
class C {
    [Symbol.iterator]: { x; y };
}
interface I {
    [Symbol.iterator]?: { x };
}

var i: I;
i = new C;
var c: C = i;

//// [symbolProperty10.js]
class C {
}
Symbol.iterator;
var i;
i = new C;
var c = i;
