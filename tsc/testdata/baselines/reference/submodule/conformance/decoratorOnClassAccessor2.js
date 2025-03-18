//// [tests/cases/conformance/decorators/class/accessor/decoratorOnClassAccessor2.ts] ////

//// [decoratorOnClassAccessor2.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    @dec public get accessor() { return 1; }
}

//// [decoratorOnClassAccessor2.js]
class C {
    @dec
    get accessor() { return 1; }
}
