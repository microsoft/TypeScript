declare var v;
declare namespace M {
    export class D {
        public p;
    }
    export class C {
        public f();
        public g() { } // error body
    }
}



