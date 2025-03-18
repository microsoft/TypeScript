//// [tests/cases/conformance/decorators/class/method/decoratorOnClassMethod7.ts] ////

//// [decoratorOnClassMethod7.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    @dec public ["method"]() {}
}

//// [decoratorOnClassMethod7.js]
class C {
    @dec
    ["method"]() { }
}
