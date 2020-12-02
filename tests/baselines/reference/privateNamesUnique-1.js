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
const b = new B(); // Error: Property #foo is missing
