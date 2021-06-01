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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _A_foo, _A_bar, _A2_instances, _A2_foo, _A2_bar, _A3_instances, _A3_foo, _A3_bar_get, _B_foo, _B_bar;
class A {
    constructor() {
        _A_foo.set(this, __classPrivateFieldGet(this, _A_bar, "f")); // Error
        _A_bar.set(this, 3);
    }
}
_A_foo = new WeakMap(), _A_bar = new WeakMap();
class A2 {
    constructor() {
        _A2_instances.add(this);
        _A2_foo.set(this, __classPrivateFieldGet(this, _A2_instances, "m", _A2_bar).call(this)); // No Error
    }
    ;
}
_A2_foo = new WeakMap(), _A2_instances = new WeakSet(), _A2_bar = function _A2_bar() { return 3; };
class A3 {
    constructor() {
        _A3_instances.add(this);
        _A3_foo.set(this, __classPrivateFieldGet(this, _A3_instances, "a", _A3_bar_get)); // No Error
    }
    ;
}
_A3_foo = new WeakMap(), _A3_instances = new WeakSet(), _A3_bar_get = function _A3_bar_get() { return 3; };
class B {
    constructor() {
        _B_foo.set(this, __classPrivateFieldGet(this, _B_bar, "f")); // Error
        _B_bar.set(this, __classPrivateFieldGet(this, _B_foo, "f"));
    }
}
_B_foo = new WeakMap(), _B_bar = new WeakMap();
