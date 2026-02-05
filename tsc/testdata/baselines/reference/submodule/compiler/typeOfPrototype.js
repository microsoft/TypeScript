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
    bar = 3;
    static bar = '';
}
Foo.prototype.bar = undefined; // Should be OK
