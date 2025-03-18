//// [tests/cases/conformance/decorators/class/accessor/decoratorOnClassAccessor6.ts] ////

//// [decoratorOnClassAccessor6.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    public @dec set accessor(value: number) { }
}

//// [decoratorOnClassAccessor6.js]
class C {
    public;
    @dec
    set accessor(value) { }
}
