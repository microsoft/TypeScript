//// [tests/cases/compiler/assignmentCompatability44.ts] ////

//// [assignmentCompatability44.ts]
class Foo {
    constructor(x: number) {}
}

const foo: { new(): Foo } = Foo;


//// [assignmentCompatability44.js]
var Foo = /** @class */ (function () {
    function Foo(x) {
    }
    return Foo;
}());
var foo = Foo;
