//// [declInput-2.ts]
module M {
    class C { }
    export class E {}
    export interface I1 {}
    interface I2 {}
    export class D {
        private c: C; // don't generate
        public m1: number;
        public m2: string;
        public m22: C; // don't generate
        public m23: E;
        public m24: I1;
        public m25: I2; // don't generate
        public m232(): E { return null;}
        public m242(): I1 { return null; }
        public m252(): I2 { return null; } // don't generate
        public m26(i:I1) {}
        public m262(i:I2) {}
        public m3():C { return new C(); }
    }
}

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


//// [declInput-2.d.ts]
declare module M {
    class E {
    }
    interface I1 {
    }
    class D {
        private c;
        m1;
        m2;
        m22;
        m23;
        m24;
        m25;
        m232();
        m242();
        m252();
        m26(i);
        m262(i);
        m3();
    }
}
