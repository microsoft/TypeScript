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
var _foo, _foo_1, _foo_2;
class A {
    constructor() {
        _foo_1.set(this, 1);
        // because static and instance private names
        // share the same lexical scope
        // https://tc39.es/proposal-class-fields/#prod-ClassBody
    }
}
_foo = new WeakMap(), _foo_1 = new WeakMap();
_foo_1.set(A, true); // error (duplicate)
class B {
    test(x) {
        __classPrivateFieldGet(x, _foo_2); // error (#foo is a static property on B, not an instance property)
    }
}
_foo_2 = new WeakMap();
_foo_2.set(B, true);
