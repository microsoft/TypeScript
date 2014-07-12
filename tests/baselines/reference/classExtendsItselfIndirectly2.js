//// [classExtendsItselfIndirectly2.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    return C;
})(N.E);

var M;
(function (M) {
    var D = (function (_super) {
        __extends(D, _super);
        function D() {
            _super.apply(this, arguments);
        }
        return D;
    })(C);
    M.D = D;
})(M || (M = {}));

var N;
(function (N) {
    var E = (function (_super) {
        __extends(E, _super);
        function E() {
            _super.apply(this, arguments);
        }
        return E;
    })(M.D);
    N.E = E;
})(N || (N = {}));

var O;
(function (O) {
    var C2 = (function (_super) {
        __extends(C2, _super);
        function C2() {
            _super.apply(this, arguments);
        }
        return C2;
    })(Q.E2);

    var P;
    (function (P) {
        var D2 = (function (_super) {
            __extends(D2, _super);
            function D2() {
                _super.apply(this, arguments);
            }
            return D2;
        })(C2);
        P.D2 = D2;
    })(P || (P = {}));

    var Q;
    (function (Q) {
        var E2 = (function (_super) {
            __extends(E2, _super);
            function E2() {
                _super.apply(this, arguments);
            }
            return E2;
        })(P.D2);
        Q.E2 = E2;
    })(Q || (Q = {}));
})(O || (O = {}));
