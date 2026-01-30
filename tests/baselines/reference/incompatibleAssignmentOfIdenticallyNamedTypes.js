//// [tests/cases/compiler/incompatibleAssignmentOfIdenticallyNamedTypes.ts] ////

//// [incompatibleAssignmentOfIdenticallyNamedTypes.ts]
interface T { }
declare const a: T;
class Foo<T> {
    x: T;
    fn() {
        this.x = a;
    }
}


//// [incompatibleAssignmentOfIdenticallyNamedTypes.js]
"use strict";
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.fn = function () {
        this.x = a;
    };
    return Foo;
}());
