//// [tests/cases/conformance/classes/members/privateNames/privateNamesUnique-2.ts] ////

//// [a.ts]
export class Foo {
    #x;
    copy(other: import("./b").Foo) {
        other.#x; // error
    }
}
    
//// [b.ts]
export class Foo {
    #x;
}

//// [main.ts]
import { Foo as A } from "./a";
import { Foo as B } from "./b";

const a = new A();
const b = new B();
a.copy(b); // error


//// [b.js]
var _Foo_x;
export class Foo {
    constructor() {
        _Foo_x.set(this, void 0);
    }
}
_Foo_x = new WeakMap();
//// [a.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _Foo_x;
export class Foo {
    constructor() {
        _Foo_x.set(this, void 0);
    }
    copy(other) {
        __classPrivateFieldGet(other, _Foo_x); // error
    }
}
_Foo_x = new WeakMap();
//// [main.js]
import { Foo as A } from "./a";
import { Foo as B } from "./b";
const a = new A();
const b = new B();
a.copy(b); // error
