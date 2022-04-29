//@target: ES6
class C {
    private [Symbol.iterator]: { x };
}
interface I {
    [Symbol.iterator]: { x };
}

var i: I;
i = new C;
var c: C = i;