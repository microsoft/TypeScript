//// [assignmentCompatWithStringIndexer.js]
// index signatures must be compatible in assignments
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
a = b; // ok
b = a; // error

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

    var B = (function (_super) {
        __extends(B, _super);
        function B() {
            _super.apply(this, arguments);
        }
        return B;
    })(A);

    var b1;
    var a1;
    a1 = b1; // ok
    b1 = a1; // error

    var B2 = (function (_super) {
        __extends(B2, _super);
        function B2() {
            _super.apply(this, arguments);
        }
        return B2;
    })(A);

    var b2;
    a1 = b2; // ok
    b2 = a1; // error

    function foo() {
        var b3;
        var a3;
        a3 = b3; // error
        b3 = a3; // error

        var b4;
        a3 = b4; // error
        b4 = a3; // error
    }
})(Generics || (Generics = {}));
