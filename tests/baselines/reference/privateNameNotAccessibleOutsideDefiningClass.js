//// [privateNameNotAccessibleOutsideDefiningClass.ts]
class A {
    #foo: number = 3;
}

new A().#foo = 4;               // Error


//// [privateNameNotAccessibleOutsideDefiningClass.js]
"use strict";
var _foo;
class A {
    constructor() {
        _foo.set(this, 3);
    }
}
_foo = new WeakMap();
new A(). = 4; // Error
