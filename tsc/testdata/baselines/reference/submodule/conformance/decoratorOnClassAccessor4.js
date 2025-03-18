//// [tests/cases/conformance/decorators/class/accessor/decoratorOnClassAccessor4.ts] ////

//// [decoratorOnClassAccessor4.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    @dec set accessor(value: number) { }
}

//// [decoratorOnClassAccessor4.js]
class C {
    @dec
    set accessor(value) { }
}
