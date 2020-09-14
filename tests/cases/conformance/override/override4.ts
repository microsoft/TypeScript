// @declaration: true
// @noImplicitOverride: true
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