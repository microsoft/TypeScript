//// [classStaticBlock4.ts]
class C {
    static s1 = 1;

    static {
        this.s1;
        C.s1;

        this.s2;
        C.s2;
    }

    static s2 = 2;
    static ss2 = this.s1;
}


//// [classStaticBlock4.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _this = this;
var C = /** @class */ (function () {
    function C() {
    }
    C.s1 = 1;
    __classPrivateFieldSet(C, _1, (function () {
        _this.s1;
        C.s1;
        _this.s2;
        C.s2;
    })(), "f");
    C.s2 = 2;
    C.ss2 = this.s1;
    return C;
}());
