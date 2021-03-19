//// [privateNamesUnique-3.ts]
class A {
    #foo = 1;
    static #foo = true; // error (duplicate)
                        // because static and instance private names
                        // share the same lexical scope
                        // https://tc39.es/proposal-class-fields/#prod-ClassBody
}
class B {
    static #foo = true;
    test(x: B) {
        x.#foo; // error (#foo is a static property on B, not an instance property)
    }
}


//// [privateNamesUnique-3.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _A_foo, _A_foo_1, _b, _B_foo;
class A {
    constructor() {
        _A_foo_1 = { value: 1 };
        // because static and instance private names
        // share the same lexical scope
        // https://tc39.es/proposal-class-fields/#prod-ClassBody
    }
    #foo = 1;
    static #foo = true; // error (duplicate)
}
_a = A, _A_foo = new WeakMap();
_A_foo_1 = { value: true }; // error (duplicate)
class B {
    test(x) {
        __classPrivateFieldGet(x, _b, "f", _B_foo); // error (#foo is a static property on B, not an instance property)
    }
}
_b = B;
_B_foo = { value: true };
