//// [genericAssignmentCompatWithInterfaces1.ts]
interface Comparable<T> {
   compareTo(other: T): number;
}
interface I<T> {
    x: Comparable<T>;
}
interface K<T> {
   x: A<T>;
}
class A<T> implements Comparable<T> { compareTo(other: T) { return 1; } }
var z = { x: new A<number>() };
var a1: I<string> = { x: new A<number>() };
var a2: I<string> = function (): { x: A<number> } {
   var z = { x: new A<number>() }; return z;
} ();
var a3: I<string> = z;
var a4: I<string> = <K<number>>z;
 


//// [genericAssignmentCompatWithInterfaces1.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.compareTo = function (other) { return 1; };
    return A;
}());
var z = { x: new A() };
var a1 = { x: new A() };
var a2 = function () {
    var z = { x: new A() };
    return z;
}();
var a3 = z;
var a4 = z;
