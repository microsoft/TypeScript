//// [symbolProperty11.ts]
class C { }
interface I {
    [Symbol.iterator]?: { x };
}

var i: I;
i = new C;
var c: C = i;

//// [symbolProperty11.js]
class C {
}
var i;
i = new C;
var c = i;
