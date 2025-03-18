//// [tests/cases/conformance/override/override4.ts] ////

//// [override4.ts]
class B {
    p1: number = 1;
    p2: number = 1;
    p3: () => void;
    p4: () => void;
    foo (v: string) {}
    fooo (v: string) {}
}

class D extends B {
    p1: number = 2;
    override p2: number = 3;
    p3: () => void;
    override p4: () => void;
    override foo (v: string) {}

    fooo (v: string) {}

}

class DD extends B {
    override foo: () => void
    fooo: () => void;
}

//// [override4.js]
class B {
    p1 = 1;
    p2 = 1;
    p3;
    p4;
    foo(v) { }
    fooo(v) { }
}
class D extends B {
    p1 = 2;
    p2 = 3;
    p3;
    p4;
    foo(v) { }
    fooo(v) { }
}
class DD extends B {
    foo;
    fooo;
}
