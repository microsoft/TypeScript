//// [tests/cases/conformance/decorators/class/property/decoratorOnClassProperty7.ts] ////

//// [decoratorOnClassProperty7.ts]
declare function dec(target: Function, propertyKey: string | symbol, paramIndex: number): void;

class C {
    @dec prop;
}

//// [decoratorOnClassProperty7.js]
class C {
    @dec
    prop;
}
