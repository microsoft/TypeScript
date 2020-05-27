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
var _foo, _foo_1;
class A {
    constructor() {
        _foo.set(this, void 0);
    }
}
_foo = new WeakMap();
class B {
    constructor() {
        _foo_1.set(this, void 0);
    }
}
_foo_1 = new WeakMap();
const b = new B();
