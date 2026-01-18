class A {
    static bar(): string {
        return "";
    }
    foo(): number { return 1; }
}
class C implements A {
    
    foo() {
        return 1;
    }
}

class C2 extends A {}

declare var c: C;
declare var c2: C2;
c = c2;
c2 = c;
c.bar(); // error
c2.bar(); // should error