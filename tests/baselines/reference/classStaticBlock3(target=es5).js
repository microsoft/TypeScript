//// [classStaticBlock3.ts]
const a = 1;

class C {
    static f1 = 1;

    static {
        console.log(C.f1, C.f2, C.f3)
    }

    static f2 = 2;

    static {
        console.log(C.f1, C.f2, C.f3)
    }

    static f3 = 3;
}


//// [classStaticBlock3.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var a = 1;
var C = /** @class */ (function () {
    function C() {
    }
    C.f1 = 1;
    __classPrivateFieldSet(C, _1, (function () {
        console.log(C.f1, C.f2, C.f3);
    })(), "f");
    C.f2 = 2;
    __classPrivateFieldSet(C, _2, (function () {
        console.log(C.f1, C.f2, C.f3);
    })(), "f");
    C.f3 = 3;
    return C;
}());
