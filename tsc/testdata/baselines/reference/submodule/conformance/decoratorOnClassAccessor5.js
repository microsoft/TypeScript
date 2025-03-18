//// [tests/cases/conformance/decorators/class/accessor/decoratorOnClassAccessor5.ts] ////

//// [decoratorOnClassAccessor5.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class C {
    @dec public set accessor(value: number) { }
}

//// [decoratorOnClassAccessor5.js]
class C {
    @dec
    set accessor(value) { }
}
