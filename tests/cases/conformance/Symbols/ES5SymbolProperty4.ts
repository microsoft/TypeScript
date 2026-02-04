//@target: ES5, ES2015
var Symbol: { iterator: string };

class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator]