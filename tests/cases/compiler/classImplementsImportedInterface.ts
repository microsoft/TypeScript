module M1 {
    export interface I {
        foo();
    }
}

module M2 {
    import T = M1.I;
    class C implements T {
        foo() {}
    }
}