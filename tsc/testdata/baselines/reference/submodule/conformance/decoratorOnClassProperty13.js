//// [tests/cases/conformance/decorators/class/property/decoratorOnClassProperty13.ts] ////

//// [decoratorOnClassProperty13.ts]
declare function dec(target: any, propertyKey: string, desc: PropertyDescriptor): void;

class C {
    @dec accessor prop;
}

//// [decoratorOnClassProperty13.js]
class C {
    @dec
    accessor prop;
}
