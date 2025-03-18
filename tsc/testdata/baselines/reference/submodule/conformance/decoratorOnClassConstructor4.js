//// [tests/cases/conformance/decorators/class/constructor/decoratorOnClassConstructor4.ts] ////

//// [decoratorOnClassConstructor4.ts]
declare var dec: any;

@dec
class A {
}

@dec
class B {
    constructor(x: number) {}
}

@dec
class C extends A {
}

//// [decoratorOnClassConstructor4.js]
@dec
class A {
}
@dec
class B {
    constructor(x) { }
}
@dec
class C extends A {
}
