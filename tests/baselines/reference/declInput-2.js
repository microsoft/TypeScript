//// [declInput-2.js]
var M;
(function (M) {
    var C = (function () {
        function C() {
        }
        return C;
    })();
    var E = (function () {
        function E() {
        }
        return E;
    })();
    M.E = E;

    var D = (function () {
        function D() {
        }
        D.prototype.m232 = function () {
            return null;
        };
        D.prototype.m242 = function () {
            return null;
        };
        D.prototype.m252 = function () {
            return null;
        };
        D.prototype.m26 = function (i) {
        };
        D.prototype.m262 = function (i) {
        };
        D.prototype.m3 = function () {
            return new C();
        };
        return D;
    })();
    M.D = D;
})(M || (M = {}));


////[declInput-2.d.ts]
declare module M {
    class E {
    }
    interface I1 {
    }
    class D {
        private c;
        public m1: number;
        public m2: string;
        public m22: C;
        public m23: E;
        public m24: I1;
        public m25: I2;
        public m232(): E;
        public m242(): I1;
        public m252(): I2;
        public m26(i: I1): void;
        public m262(i: I2): void;
        public m3(): C;
    }
}
