//// [tests/cases/conformance/decorators/class/property/decoratorOnClassProperty3.ts] ////

//// [decoratorOnClassProperty3.ts]
declare function dec(target: any, propertyKey: string): void;

class C {
    public @dec prop;
}

//// [decoratorOnClassProperty3.js]
class C {
    public;
    @dec
    prop;
}
