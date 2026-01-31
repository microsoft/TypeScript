//// [tests/cases/compiler/recursiveProperties.ts] ////

//// [recursiveProperties.ts]
class A {
    get testProp() { return this.testProp; }
}

class B {
    set testProp(value:string) { this.testProp = value; }
}

//// [recursiveProperties.js]
class A {
    get testProp() { return this.testProp; }
}
class B {
    set testProp(value) { this.testProp = value; }
}
