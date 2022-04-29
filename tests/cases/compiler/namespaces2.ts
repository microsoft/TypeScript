module A {
    export module B {
        export class C { }
    }
}

var c: A.B.C = new A.B.C();