//// [tests/cases/compiler/declInput-2.ts] ////

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
    class C {
    }
    class E {
    }
    M.E = E;
    class D {
        c;
        m1;
        m2;
        m22;
        m23;
        m24;
        m25;
        m232() { return null; }
        m242() { return null; }
        m252() { return null; }
        m26(i) { }
        m262(i) { }
        m3() { return new C(); }
    }
    M.D = D;
})(M || (M = {}));
