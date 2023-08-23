//// [tests/cases/conformance/classes/members/privateNames/privateNameStaticMethodClassExpression.ts] ////

//// [privateNameStaticMethodClassExpression.ts]
const C = class D {
    static #field = D.#method();
    static #method() { return 42; }
    static getClass() { return D; }
    static getField() { return C.#field };
}

console.log(C.getClass().getField());
C.getClass().#method; // Error
C.getClass().#field; // Error



//// [privateNameStaticMethodClassExpression.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _D_field, _D_method;
const C = (_a = class D {
        static getClass() { return _a; }
        static getField() { return __classPrivateFieldGet(C, _a, "f", _D_field); }
        ;
    },
    _D_method = function _D_method() { return 42; },
    _D_field = { value: __classPrivateFieldGet(_a, _a, "m", _D_method).call(_a) },
    _a);
console.log(C.getClass().getField());
C.getClass().; // Error
C.getClass().; // Error
