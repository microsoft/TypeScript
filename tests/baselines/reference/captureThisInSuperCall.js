//// [tests/cases/compiler/captureThisInSuperCall.ts] ////

//// [captureThisInSuperCall.ts]
class A {
    constructor(p:any) {}
}

class B extends A {
    constructor() { super({ test: () => this.someMethod()}); } 
    someMethod() {}
}

//// [captureThisInSuperCall.js]
class A {
    constructor(p) { }
}
class B extends A {
    constructor() { super({ test: () => this.someMethod() }); }
    someMethod() { }
}
