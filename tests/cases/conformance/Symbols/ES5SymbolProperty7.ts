//@target: ES5
var Symbol: { iterator: any };

class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator]