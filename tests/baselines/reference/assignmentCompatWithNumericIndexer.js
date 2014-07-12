//// [assignmentCompatWithNumericIndexer.js]
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
a = b;
b = a; // error

var b2;
a = b2;
b2 = a; // error

var Generics;
(function (Generics) {
    var A = (function () {
        function A() {
        }
        return A;
    })();

    var B = (function (_super) {
        __extends(B, _super);
        function B() {
            _super.apply(this, arguments);
        }
        return B;
    })(A);

    function foo() {
        var a;
        var b;
        a = b; // error
        b = a; // error

        var b2;
        a = b2; // error
        b2 = a; // error

        var b3;
        a = b3; // ok
        b3 = a; // ok
    }
})(Generics || (Generics = {}));
