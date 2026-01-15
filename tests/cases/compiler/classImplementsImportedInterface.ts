namespace M1 {
    export interface I {
        foo();
    }
}

namespace M2 {
    import T = M1.I;
    class C implements T {
        foo() {}
    }
}