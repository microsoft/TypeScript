//@target: ES5
var Symbol: { iterator: symbol };

class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator](0) // Should error