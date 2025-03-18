//// [tests/cases/conformance/decorators/class/method/decoratorOnClassMethod3.ts] ////

//// [decoratorOnClassMethod3.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    public @dec method() {}
}

//// [decoratorOnClassMethod3.js]
class C {
    public;
    @dec
    method() { }
}
