//@target: ES5
var Symbol: { readonly iterator: unique symbol };

class C {
    [Symbol.iterator]() { }
}

(new C)[Symbol.iterator](0) // Should error