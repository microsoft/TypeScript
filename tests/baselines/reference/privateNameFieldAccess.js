//// [privateNameFieldAccess.ts]
class A {
    #myField = "hello world";
    constructor() {
        console.log(this.#myField);
    }
}


//// [privateNameFieldAccess.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _A_myField;
class A {
    constructor() {
        _A_myField.set(this, "hello world");
        console.log(__classPrivateFieldGet(this, _A_myField));
    }
}
_A_myField = new WeakMap();
