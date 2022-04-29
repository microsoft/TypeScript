//// [constraintsThatReferenceOtherContstraints1.ts]
interface Object { }

class Foo<T, U extends T> { }
class Bar<T extends Object, U extends T> {
    data: Foo<Object, Object>; // Error 1 Type 'Object' does not satisfy the constraint 'T' for type parameter 'U extends T'.
}

var x: Foo< { a: string }, { a: string; b: number }>; // Error 2 Type '{ a: string; b: number; }' does not satisfy the constraint 'T' for type 


//// [constraintsThatReferenceOtherContstraints1.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
var Bar = /** @class */ (function () {
    function Bar() {
    }
    return Bar;
}());
var x; // Error 2 Type '{ a: string; b: number; }' does not satisfy the constraint 'T' for type 
