//// [tests/cases/conformance/decorators/class/property/decoratorOnClassProperty2.ts] ////

//// [decoratorOnClassProperty2.ts]
declare function dec(target: any, propertyKey: string): void;

class C {
    @dec public prop;
}

//// [decoratorOnClassProperty2.js]
class C {
    @dec
    prop;
}
