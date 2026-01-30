//// [tests/cases/compiler/assignmentCompatability44.ts] ////

//// [assignmentCompatability44.ts]
class Foo {
    constructor(x: number) {}
}

const foo: { new(): Foo } = Foo;


//// [assignmentCompatability44.js]
"use strict";
var Foo = /** @class */ (function () {
    function Foo(x) {
    }
    return Foo;
}());
var foo = Foo;
