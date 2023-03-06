//// [privateNameBadAssignment.ts]
exports.#nope = 1;           // Error (outside class body)
function A() { }
A.prototype.#no = 2;         // Error (outside class body)

class B {}
B.#foo = 3;                  // Error (outside class body)

class C {
    #bar = 6;
    constructor () {
        exports.#bar = 6;    // Error
        this.#foo = 3;       // Error (undeclared)
    }
}


//// [privateNameBadAssignment.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _C_bar;
exports. = 1; // Error (outside class body)
function A() { }
A.prototype. = 2; // Error (outside class body)
class B {
}
B. = 3; // Error (outside class body)
class C {
    constructor() {
        _C_bar.set(this, 6);
        __classPrivateFieldSet(exports, _C_bar, 6, "f"); // Error
        this. = 3; // Error (undeclared)
    }
}
_C_bar = new WeakMap();
