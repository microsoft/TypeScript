//// [privateNameSetterExprReturnValue.ts]
class C {
    set #foo(a: number) {}
    bar() {
        let x = (this.#foo = 42 * 2);
        console.log(x); // 84
    }
}

new C().bar();


//// [privateNameSetterExprReturnValue.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _C_instances, _C_foo_set;
class C {
    constructor() {
        _C_instances.add(this);
    }
    bar() {
        let x = (__classPrivateFieldSet(this, _C_instances, 42 * 2, "a", _C_foo_set));
        console.log(x); // 84
    }
}
_C_instances = new WeakSet(), _C_foo_set = function _C_foo_set(a) { };
new C().bar();
