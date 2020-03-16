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
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    var E = /** @class */ (function () {
        function E() {
        }
        return E;
    }());
    M.E = E;
    var D = /** @class */ (function () {
        function D() {
        }
        D.prototype.m232 = function () { return null; };
        D.prototype.m242 = function () { return null; };
        D.prototype.m252 = function () { return null; }; // don't generate
        D.prototype.m26 = function (i) { };
        D.prototype.m262 = function (i) { };
        D.prototype.m3 = function () { return new C(); };
        return D;
    }());
    M.D = D;
})(M || (M = {}));


//// [declInput-2.d.ts]
declare module M {
    class C {
    }
    export class E {
    }
    export interface I1 {
    }
    interface I2 {
    }
    export class D {
        private c;
        m1: number;
        m2: string;
        m22: C;
        m23: E;
        m24: I1;
        m25: I2;
        m232(): E;
        m242(): I1;
        m252(): I2;
        m26(i: I1): void;
        m262(i: I2): void;
        m3(): C;
    }
    export {};
}
