//@target: ES6
class C { }
interface I {
    [Symbol.iterator]?: { x };
}

var i: I;
i = new C;
var c: C = i;