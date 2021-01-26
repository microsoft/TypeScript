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
var __classPrivateMethodGet = (this && this.__classPrivateMethodGet) || function (receiver, instances, fn) {
    if (!instances.has(receiver)) {
        throw new TypeError("attempted to get private method on non-instance");
    }
    return fn;
};
var _A_foo, _A_bar, _A2_foo, _A2_bar, _A2_instances, _A3_foo, _A3_bar, _B_foo, _B_bar;
class A {
    constructor() {
        _A_foo.set(this, __classPrivateFieldGet(this, _A_bar)); // Error
        _A_bar.set(this, 3);
    }
}
_A_foo = new WeakMap(), _A_bar = new WeakMap();
class A2 {
    constructor() {
        _A2_instances.add(this);
        _A2_foo.set(this, __classPrivateMethodGet(this, _A2_instances, _A2_bar).call(this)); // No Error
    }
    ;
}
_A2_foo = new WeakMap(), _A2_instances = new WeakSet(), _A2_bar = function _A2_bar() { return 3; };
class A3 {
    constructor() {
        _A3_foo.set(this, this.); // No Error
    }
    get () { return 3; }
    ;
}
_A3_foo = new WeakMap();
class B {
    constructor() {
        _B_foo.set(this, __classPrivateFieldGet(this, _B_bar)); // Error
        _B_bar.set(this, __classPrivateFieldGet(this, _B_foo));
    }
}
_B_foo = new WeakMap(), _B_bar = new WeakMap();
