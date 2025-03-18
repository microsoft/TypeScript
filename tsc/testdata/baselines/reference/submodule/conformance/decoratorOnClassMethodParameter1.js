//// [tests/cases/conformance/decorators/class/method/parameter/decoratorOnClassMethodParameter1.ts] ////

//// [decoratorOnClassMethodParameter1.ts]
declare function dec(target: Object, propertyKey: string | symbol, parameterIndex: number): void;

class C {
    method(@dec p: number) {}
}

//// [decoratorOnClassMethodParameter1.js]
class C {
    method(p) { }
}
