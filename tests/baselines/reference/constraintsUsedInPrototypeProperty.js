//// [tests/cases/compiler/constraintsUsedInPrototypeProperty.ts] ////

//// [constraintsUsedInPrototypeProperty.ts]
class Foo<T extends number, U, V extends string> { }
Foo.prototype; // Foo<any, any, any>

//// [constraintsUsedInPrototypeProperty.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
Foo.prototype; // Foo<any, any, any>
