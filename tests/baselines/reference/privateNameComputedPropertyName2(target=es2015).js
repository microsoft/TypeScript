//// [privateNameComputedPropertyName2.ts]
let getX: (a: A) => number;

class A {
    #x = 100;
    [(getX = (a: A) => a.#x, "_")]() {}
}

console.log(getX(new A));


//// [privateNameComputedPropertyName2.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _A_x;
let getX;
class A {
    constructor() {
        _A_x.set(this, 100);
    }
    [(_A_x = new WeakMap(), (getX = (a) => __classPrivateFieldGet(a, _A_x), "_"))]() { }
}
console.log(getX(new A));
