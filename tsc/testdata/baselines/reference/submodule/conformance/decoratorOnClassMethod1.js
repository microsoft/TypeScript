//// [tests/cases/conformance/decorators/class/method/decoratorOnClassMethod1.ts] ////

//// [decoratorOnClassMethod1.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    @dec method() {}
}

//// [decoratorOnClassMethod1.js]
class C {
    @dec
    method() { }
}
