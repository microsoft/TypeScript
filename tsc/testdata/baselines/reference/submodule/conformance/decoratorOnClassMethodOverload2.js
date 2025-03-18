//// [tests/cases/conformance/decorators/class/method/decoratorOnClassMethodOverload2.ts] ////

//// [decoratorOnClassMethodOverload2.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    method()
    @dec
    method() { }
}

//// [decoratorOnClassMethodOverload2.js]
class C {
    @dec
    method() { }
}
