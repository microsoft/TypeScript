//// [tests/cases/conformance/decorators/class/method/parameter/decoratorOnClassMethodParameter2.ts] ////

//// [decoratorOnClassMethodParameter2.ts]
declare function dec(target: Object, propertyKey: string | symbol, parameterIndex: number): void;

class C {
    method(this: C, @dec p: number) {}
}

//// [decoratorOnClassMethodParameter2.js]
class C {
    method(p) { }
}
