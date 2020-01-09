//// [privateNamesUseBeforeDef.ts]
class A {
    #foo = this.#bar; // Error
    #bar = 3;
}

class B {
    #foo = this.#bar; // Error
    #bar = this.#foo;
}


//// [privateNamesUseBeforeDef.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _foo, _bar, _foo_1, _bar_1;
class A {
    constructor() {
        _foo.set(this, __classPrivateFieldGet(this, _bar)); // Error
        _bar.set(this, 3);
    }
}
_foo = new WeakMap(), _bar = new WeakMap();
class B {
    constructor() {
        _foo_1.set(this, __classPrivateFieldGet(this, _bar_1)); // Error
        _bar_1.set(this, __classPrivateFieldGet(this, _foo_1));
    }
}
_foo_1 = new WeakMap(), _bar_1 = new WeakMap();
