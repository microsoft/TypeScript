//// [tests/cases/conformance/decorators/class/property/decoratorOnClassProperty1.ts] ////

//// [decoratorOnClassProperty1.ts]
declare function dec(target: any, propertyKey: string): void;

class C {
    @dec prop;
}

//// [decoratorOnClassProperty1.js]
class C {
    @dec
    prop;
}
