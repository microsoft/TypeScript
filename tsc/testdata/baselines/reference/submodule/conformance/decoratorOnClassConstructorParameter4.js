//// [tests/cases/conformance/decorators/class/constructor/parameter/decoratorOnClassConstructorParameter4.ts] ////

//// [decoratorOnClassConstructorParameter4.ts]
declare function dec(target: Function, propertyKey: string | symbol, parameterIndex: number): void;

class C {
    constructor(public @dec p: number) {}
}

//// [decoratorOnClassConstructorParameter4.js]
class C {
    constructor(public, p) { }
}
