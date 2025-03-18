//// [tests/cases/conformance/decorators/class/method/decoratorOnClassMethod6.ts] ////

//// [decoratorOnClassMethod6.ts]
declare function dec(): <T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T>;

class C {
    @dec ["method"]() {}
}

//// [decoratorOnClassMethod6.js]
class C {
    @dec
    ["method"]() { }
}
