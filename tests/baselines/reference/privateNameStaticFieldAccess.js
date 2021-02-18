//// [privateNameStaticFieldAccess.ts]
class A {
    static #myField = "hello world";
    constructor() {
        console.log(A.#myField); //Ok
        console.log(this.#myField); //Error
    }
}


//// [privateNameStaticFieldAccess.js]
var __classStaticPrivateFieldGet = (this && this.__classStaticPrivateFieldGet) || function (receiver, classConstructor, propertyDescriptor) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    return propertyDescriptor.value;
};
var _A_myField;
class A {
    constructor() {
        console.log(__classStaticPrivateFieldGet(A, A, _A_myField)); //Ok
        console.log(__classStaticPrivateFieldGet(this, A, _A_myField)); //Error
    }
}
_A_myField = { value: "hello world" };
