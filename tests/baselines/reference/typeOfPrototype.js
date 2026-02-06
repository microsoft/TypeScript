//// [tests/cases/compiler/typeOfPrototype.ts] ////

//// [typeOfPrototype.ts]
class Foo {
    bar = 3;
    static bar = '';
}
Foo.prototype.bar = undefined; // Should be OK


//// [typeOfPrototype.js]
"use strict";
class Foo {
    constructor() {
        this.bar = 3;
    }
}
Foo.bar = '';
Foo.prototype.bar = undefined; // Should be OK
