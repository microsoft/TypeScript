//@target: ES6
class C1 {
    [Symbol.toStringTag]() {
        return { x: "" };
    }
}

class C2 extends C1 { }

var c: C2;
var obj = c[Symbol.toStringTag]().x;