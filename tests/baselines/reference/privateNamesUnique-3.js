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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _A_foo, _A_foo_1, _B_foo;
class A {
    constructor() {
        _A_foo_1.set(this, 1);
        // because static and instance private names
        // share the same lexical scope
        // https://tc39.es/proposal-class-fields/#prod-ClassBody
    }
}
_A_foo = new WeakMap(), _A_foo_1 = new WeakMap();
_A_foo_1.set(A, true); // error (duplicate)
class B {
    test(x) {
        __classPrivateFieldGet(x, _B_foo); // error (#foo is a static property on B, not an instance property)
    }
}
_B_foo = new WeakMap();
_B_foo.set(B, true);
