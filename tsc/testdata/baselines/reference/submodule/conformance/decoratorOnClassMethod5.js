//// [tests/cases/conformance/decorators/class/method/decoratorOnClassMethod5.ts] ////

//// [decoratorOnClassMethod5.ts]
declare function dec(): <T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T>;

class C {
    @dec() ["method"]() {}
}

//// [decoratorOnClassMethod5.js]
class C {
    @dec()
    ["method"]() { }
}
