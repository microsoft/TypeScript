//// [tests/cases/conformance/decorators/class/method/decoratorOnClassMethod8.ts] ////

//// [decoratorOnClassMethod8.ts]
declare function dec<T>(target: T): T;

class C {
    @dec method() {}
}

//// [decoratorOnClassMethod8.js]
class C {
    @dec
    method() { }
}
