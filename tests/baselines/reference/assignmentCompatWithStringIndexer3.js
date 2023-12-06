//// [tests/cases/conformance/types/typeRelationships/assignmentCompatibility/assignmentCompatWithStringIndexer3.ts] ////

//// [assignmentCompatWithStringIndexer3.ts]
// Derived type indexer must be subtype of base type indexer

interface Base { foo: string; }
interface Derived extends Base { bar: string; }
interface Derived2 extends Derived { baz: string; }

var a: A;
var b1: { [x: string]: string; }
a = b1; // error
b1 = a; // error

module Generics {
    class A<T extends Derived> {
        [x: string]: T;
    }
   
    function foo<T extends Derived>() {
        var a: A<T>;
        var b: { [x: string]: string; }
        a = b; // error
        b = a; // error
    }
}

//// [assignmentCompatWithStringIndexer3.js]
// Derived type indexer must be subtype of base type indexer
var a;
var b1;
a = b1; // error
b1 = a; // error
var Generics;
(function (Generics) {
    var A = /** @class */ (function () {
        function A() {
        }
        return A;
    }());
    function foo() {
        var a;
        var b;
        a = b; // error
        b = a; // error
    }
})(Generics || (Generics = {}));
