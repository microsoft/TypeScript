//// [tests/cases/conformance/decorators/class/accessor/decoratorOnClassAccessor1.ts] ////

//// [decoratorOnClassAccessor1.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    @dec get accessor() { return 1; }
}

//// [decoratorOnClassAccessor1.js]
class C {
    @dec
    get accessor() { return 1; }
}
