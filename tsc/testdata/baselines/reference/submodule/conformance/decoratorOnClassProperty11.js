//// [tests/cases/conformance/decorators/class/property/decoratorOnClassProperty11.ts] ////

//// [decoratorOnClassProperty11.ts]
declare function dec(): <T>(target: any, propertyKey: string) => void;

class C {
    @dec prop;
}

//// [decoratorOnClassProperty11.js]
class C {
    @dec
    prop;
}
