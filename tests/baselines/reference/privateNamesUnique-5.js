//// [privateNamesUnique-5.ts]
// same as privateNamesUnique-1, but with an interface

class A {
    #foo: number;
}
interface A2 extends A { }

class B {
    #foo: number;
}

const b: A2 = new B();


//// [privateNamesUnique-5.js]
"use strict";
// same as privateNamesUnique-1, but with an interface
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
const b = new B();
