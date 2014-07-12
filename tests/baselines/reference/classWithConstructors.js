//// [classWithConstructors.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var NonGeneric;
(function (NonGeneric) {
    var C = (function () {
        function C(x) {
        }
        return C;
    })();

    var c = new C();
    var c2 = new C('');

    var C2 = (function () {
        function C2(x) {
        }
        return C2;
    })();

    var c3 = new C2();
    var c4 = new C2('');
    var c5 = new C2(1);

    var D = (function (_super) {
        __extends(D, _super);
        function D() {
            _super.apply(this, arguments);
        }
        return D;
    })(C2);

    var d = new D();
    var d2 = new D(1);
    var d3 = new D('');
})(NonGeneric || (NonGeneric = {}));

var Generics;
(function (Generics) {
    var C = (function () {
        function C(x) {
        }
        return C;
    })();

    var c = new C();
    var c2 = new C('');

    var C2 = (function () {
        function C2(x) {
        }
        return C2;
    })();

    var c3 = new C2();
    var c4 = new C2('');
    var c5 = new C2(1, 2);

    var D = (function (_super) {
        __extends(D, _super);
        function D() {
            _super.apply(this, arguments);
        }
        return D;
    })(C2);

    var d = new D();
    var d2 = new D(1);
    var d3 = new D('');
})(Generics || (Generics = {}));
