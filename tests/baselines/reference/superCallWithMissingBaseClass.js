//// [tests/cases/compiler/superCallWithMissingBaseClass.ts] ////

//// [superCallWithMissingBaseClass.ts]
class Foo extends Bar {
    m1() {
        return super.m1();
    }

    static m2() {
        return super.m2();
    }
}

//// [superCallWithMissingBaseClass.js]
class Foo extends Bar {
    m1() {
        return super.m1();
    }
    static m2() {
        return super.m2();
    }
}
