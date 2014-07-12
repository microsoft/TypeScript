// @declaration: true
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