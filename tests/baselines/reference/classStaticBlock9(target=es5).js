//// [classStaticBlock9.ts]
class A {
    static bar = A.foo + 1
    static {
        A.foo + 2;
    }
    static foo = 1;
}


//// [classStaticBlock9.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var A = /** @class */ (function () {
    function A() {
    }
    A.bar = A.foo + 1;
    __classPrivateFieldSet(A, _1, (function () {
        A.foo + 2;
    })(), "f");
    A.foo = 1;
    return A;
}());
