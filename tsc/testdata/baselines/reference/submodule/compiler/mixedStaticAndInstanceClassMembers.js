//// [tests/cases/compiler/mixedStaticAndInstanceClassMembers.ts] ////

//// [mixedStaticAndInstanceClassMembers.ts]
class A {
    f() {}
    static m1 (a: string): void;
    m1 (a: number): void;
    m1 (a: any): void {
    }
}

class B {
    f() {}
    m1 (a: string): void;
    static m1 (a: number): void;
    m1 (a: any): void {
    }
}

//// [mixedStaticAndInstanceClassMembers.js]
class A {
    f() { }
    m1(a) {
    }
}
class B {
    f() { }
    m1(a) {
    }
}
