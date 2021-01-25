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
var __classPrivateMethodGet = (this && this.__classPrivateMethodGet) || function (receiver, accessCheck, fn) {
    if (!accessCheck.has(receiver)) {
        throw new TypeError("attempted to get private method on non-instance");
    }
    return fn;
};
var _foo, _bar, _foo_1, _bar_1, _bar_2, _foo_2, _bar_3, _foo_3, _bar_4;
class A {
    constructor() {
        _foo.set(this, __classPrivateFieldGet(this, _bar)); // Error
        _bar.set(this, 3);
    }
}
_foo = new WeakMap(), _bar = new WeakMap();
class A2 {
    constructor() {
        _bar_1.add(this);
        _foo_1.set(this, __classPrivateMethodGet(this, _bar_1, _bar_2).call(this)); // No Error
    }
    ;
}
_foo_1 = new WeakMap(), _bar_1 = new WeakSet(), _bar_2 = function _bar_2() { return 3; };
class A3 {
    constructor() {
        _foo_2.set(this, this.); // No Error
    }
    get () { return 3; }
    ;
}
_foo_2 = new WeakMap();
class B {
    constructor() {
        _foo_3.set(this, __classPrivateFieldGet(this, _bar_4)); // Error
        _bar_4.set(this, __classPrivateFieldGet(this, _foo_3));
    }
}
_foo_3 = new WeakMap(), _bar_4 = new WeakMap();
