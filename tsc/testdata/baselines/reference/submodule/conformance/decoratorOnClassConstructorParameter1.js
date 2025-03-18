//// [tests/cases/conformance/decorators/class/constructor/parameter/decoratorOnClassConstructorParameter1.ts] ////

//// [decoratorOnClassConstructorParameter1.ts]
declare function dec(target: Function, propertyKey: string | symbol, parameterIndex: number): void;

class C {
    constructor(@dec p: number) {}
}

//// [decoratorOnClassConstructorParameter1.js]
class C {
    constructor(p) { }
}
