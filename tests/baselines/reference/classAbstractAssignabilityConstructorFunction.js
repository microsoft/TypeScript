//// [classAbstractAssignabilityConstructorFunction.ts]
abstract class A { }

// var AA: typeof A;
var AAA: new() => A;

// AA = A; // okay
AAA = A; // error. 
AAA = "asdf";

//// [classAbstractAssignabilityConstructorFunction.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
// var AA: typeof A;
var AAA;
// AA = A; // okay
AAA = A; // error. 
AAA = "asdf";
