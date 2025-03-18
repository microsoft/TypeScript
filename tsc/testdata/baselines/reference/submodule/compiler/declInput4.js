//// [tests/cases/compiler/declInput4.ts] ////

//// [declInput4.ts]
module M {
    class C { }
    export class E {}
    export interface I1 {}
    interface I2 {}
    export class D {
        public m1: number;
        public m2: string;
        public m23: E;
        public m24: I1;
        public m232(): E { return null;}
        public m242(): I1 { return null; }
        public m26(i:I1) {}
    }
}

//// [declInput4.js]
var M;
(function (M) {
    class C {
    }
    class E {
    }
    M.E = E;
    class D {
        m1;
        m2;
        m23;
        m24;
        m232() { return null; }
        m242() { return null; }
        m26(i) { }
    }
    M.D = D;
})(M || (M = {}));
