//// [privateNamesUseBeforeDef.ts]
class A {
    #foo = this.#bar; // Error
    #bar = 3;
}

class A2 {
    #foo = this.#bar(); // No Error
    #bar() { return 3 };
}

class A3 {
    #foo = this.#bar; // No Error
    get #bar() { return 3 };
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
var _foo, _bar, _foo_1, _bar_1, _foo_2, _bar_2, _foo_3, _bar_3;
class A {
    constructor() {
        _foo.set(this, __classPrivateFieldGet(this, _bar)); // Error
        _bar.set(this, 3);
    }
}
_foo = new WeakMap(), _bar = new WeakMap();
class A2 {
    constructor() {
        _foo_1.set(this, __classPrivateFieldGet(this, _bar_1).call(this)); // No Error
    }
    () { return 3; }
    ;
}
_foo_1 = new WeakMap(), _bar_1 = new WeakMap();
class A3 {
    constructor() {
        _foo_2.set(this, __classPrivateFieldGet(this, _bar_2)); // No Error
    }
    get () { return 3; }
    ;
}
_foo_2 = new WeakMap(), _bar_2 = new WeakMap();
class B {
    constructor() {
        _foo_3.set(this, __classPrivateFieldGet(this, _bar_3)); // Error
        _bar_3.set(this, __classPrivateFieldGet(this, _foo_3));
    }
}
_foo_3 = new WeakMap(), _bar_3 = new WeakMap();
