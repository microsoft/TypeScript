//// [tests/cases/conformance/classes/members/privateNames/privateNamesUnique-1.ts] ////

//// [privateNamesUnique-1.ts]
class A {
    #foo: number;
}

class B {
    #foo: number;
}

const b: A = new B();     // Error: Property #foo is missing


//// [privateNamesUnique-1.js]
"use strict";
var _A_foo, _B_foo;
class A {
    constructor() {
        _A_foo.set(this, void 0);
    }
}
_A_foo = new WeakMap();
class B {
    constructor() {
        _B_foo.set(this, void 0);
    }
}
_B_foo = new WeakMap();
const b = new B(); // Error: Property #foo is missing
