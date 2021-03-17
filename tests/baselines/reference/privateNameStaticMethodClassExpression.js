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
var __classStaticPrivateFieldGet = (this && this.__classStaticPrivateFieldGet) || function (receiver, classConstructor, propertyDescriptor) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    if (propertyDescriptor === undefined) {
        throw new TypeError("Private static field was accessed before its declaration.");
    }
    return propertyDescriptor.value;
};
var __classStaticPrivateMethodGet = (this && this.__classStaticPrivateMethodGet) || function (receiver, classConstructor, fn) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    return fn;
};
var _a, _D_field, _D_method;
const C = (_a = class D {
        static getClass() { return D; }
        static getField() { return __classStaticPrivateFieldGet(C, _a, _D_field); }
        ;
    },
    _D_method = function _D_method() { return 42; },
    _D_field = { value: __classStaticPrivateMethodGet(_a, _a, _D_method).call(_a) },
    _a);
console.log(C.getClass().getField());
C.getClass().; // Error
C.getClass().; // Error
