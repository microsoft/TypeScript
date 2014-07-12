declare var v;
declare module M {
    export class D {
        public p;
    }
    export class C {
        public f();
        public g() { } // error body
    }
}



