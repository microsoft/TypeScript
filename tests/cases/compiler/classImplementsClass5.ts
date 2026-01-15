class A {
    private x = 1;
    foo(): number { return 1; }
}
class C implements A {
    private x = 1;
    foo() {
        return 1;
    }
}

class C2 extends A {}

declare var c: C;
declare var c2: C2;
c = c2;
c2 = c;