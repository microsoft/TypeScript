//// [tests/cases/conformance/decorators/class/property/decoratorOnClassProperty10.ts] ////

//// [decoratorOnClassProperty10.ts]
declare function dec(): <T>(target: any, propertyKey: string) => void;

class C {
    @dec() prop;
}

//// [decoratorOnClassProperty10.js]
class C {
    @dec()
    prop;
}
