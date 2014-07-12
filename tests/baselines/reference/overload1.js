//// [overload1.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var O;
(function (O) {
    var A = (function () {
        function A() {
        }
        return A;
    })();
    O.A = A;

    var B = (function (_super) {
        __extends(B, _super);
        function B() {
            _super.apply(this, arguments);
        }
        return B;
    })(A);
    O.B = B;

    var C = (function (_super) {
        __extends(C, _super);
        function C() {
            _super.apply(this, arguments);
        }
        return C;
    })(B);
    O.C = C;
})(O || (O = {}));

var e = x.g(new O.A());
var y = x.f(3);
y = x.f("nope"); // can't assign number to string
var z = x.g(x.g(3, 3));
z = x.g(2, 2, 2); // no match
z = x.g(); // no match
z = x.g(new O.B()); // ambiguous (up and down conversion)
z = x.h(2, 2); // no match
z = x.h("hello", 0); // good

var v = x.g;
