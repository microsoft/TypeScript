//// [tests/cases/conformance/decorators/class/method/decoratorOnClassMethod13.ts] ////

//// [decoratorOnClassMethod13.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    @dec ["1"]() { }
    @dec ["b"]() { }
}

//// [decoratorOnClassMethod13.js]
class C {
    @dec
    ["1"]() { }
    @dec
    ["b"]() { }
}
