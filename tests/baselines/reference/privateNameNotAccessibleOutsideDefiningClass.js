//// [tests/cases/conformance/classes/members/privateNames/privateNameNotAccessibleOutsideDefiningClass.ts] ////

//// [privateNameNotAccessibleOutsideDefiningClass.ts]
class A {
    #foo: number = 3;
}

new A().#foo = 4;               // Error


//// [privateNameNotAccessibleOutsideDefiningClass.js]
"use strict";
var _A_foo;
class A {
    constructor() {
        _A_foo.set(this, 3);
    }
}
_A_foo = new WeakMap();
new A(). = 4; // Error
