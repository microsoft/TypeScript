//// [tests/cases/conformance/decorators/class/method/decoratorOnClassMethod4.ts] ////

//// [decoratorOnClassMethod4.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    @dec ["method"]() {}
}

//// [decoratorOnClassMethod4.js]
class C {
    @dec
    ["method"]() { }
}
