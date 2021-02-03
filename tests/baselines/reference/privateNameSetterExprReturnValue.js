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
var __classPrivateAccessorSet = (this && this.__classPrivateAccessorSet) || function (receiver, instances, fn, value) {
    if (!instances.has(receiver)) {
        throw new TypeError("attempted to set private accessor on non-instance");
    }
    fn.call(receiver, value);
    return value;
};
var _C_foo_set, _C_instances;
class C {
    constructor() {
        _C_instances.add(this);
    }
    bar() {
        let x = (__classPrivateAccessorSet(this, _C_instances, _C_foo_set, 42 * 2));
        console.log(x); // 84
    }
}
_C_instances = new WeakSet(), _C_foo_set = function _C_foo_set(a) { };
new C().bar();
