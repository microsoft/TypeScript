//// [assignmentCompatWithNumericIndexer3.js]
// Derived type indexer must be subtype of base type indexer
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var A = (function () {
    function A() {
    }
    return A;
})();

var a;
var b;

a = b; // error
b = a; // ok

var B2 = (function (_super) {
    __extends(B2, _super);
    function B2() {
        _super.apply(this, arguments);
    }
    return B2;
})(A);

var b2;
a = b2; // ok
b2 = a; // error

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
        b = a; // ok

        var b2;
        a = b2; // ok
        b2 = a; // ok
    }
})(Generics || (Generics = {}));
