//// [tests/cases/conformance/decorators/class/method/decoratorOnClassMethod10.ts] ////

//// [decoratorOnClassMethod10.ts]
declare function dec(target: Function, paramIndex: number): void;

class C {
    @dec method() {}
}

//// [decoratorOnClassMethod10.js]
class C {
    @dec
    method() { }
}
