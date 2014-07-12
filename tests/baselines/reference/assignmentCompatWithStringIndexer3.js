//// [assignmentCompatWithStringIndexer3.js]
// Derived type indexer must be subtype of base type indexer

var a;
var b1;
a = b1; // error
b1 = a; // error

var Generics;
(function (Generics) {
    var A = (function () {
        function A() {
        }
        return A;
    })();

    function foo() {
        var a;
        var b;
        a = b; // error
        b = a; // error
    }
})(Generics || (Generics = {}));
