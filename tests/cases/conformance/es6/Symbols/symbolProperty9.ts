//@target: ES6
class C {
    [Symbol.iterator]: { x; y };
}
interface I {
    [Symbol.iterator]: { x };
}

var i: I;
i = new C;
var c: C = i;