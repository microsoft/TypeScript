//// [tests/cases/conformance/decorators/class/method/decoratorOnClassMethod2.ts] ////

//// [decoratorOnClassMethod2.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    @dec public method() {}
}

//// [decoratorOnClassMethod2.js]
class C {
    @dec
    method() { }
}
