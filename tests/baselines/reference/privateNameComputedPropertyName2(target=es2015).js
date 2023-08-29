//// [tests/cases/conformance/classes/members/privateNames/privateNameComputedPropertyName2.ts] ////

//// [privateNameComputedPropertyName2.ts]
let getX: (a: A) => number;

class A {
    #x = 100;
    [(getX = (a: A) => a.#x, "_")]() {}
}

console.log(getX(new A));


//// [privateNameComputedPropertyName2.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _A_x;
let getX;
class A {
    constructor() {
        _A_x.set(this, 100);
    }
    [(_A_x = new WeakMap(), getX = (a) => __classPrivateFieldGet(a, _A_x, "f"), "_")]() { }
}
console.log(getX(new A));
