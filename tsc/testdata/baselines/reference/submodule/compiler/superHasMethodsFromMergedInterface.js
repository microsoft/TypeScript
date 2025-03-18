//// [tests/cases/compiler/superHasMethodsFromMergedInterface.ts] ////

//// [superHasMethodsFromMergedInterface.ts]
class C { m1() { } }
interface C { m2(): void }
class Sub extends C {
    m3() {
        super.m2();
    }
}


//// [superHasMethodsFromMergedInterface.js]
class C {
    m1() { }
}
class Sub extends C {
    m3() {
        super.m2();
    }
}
