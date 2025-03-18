//// [tests/cases/conformance/decorators/class/property/decoratorOnClassProperty6.ts] ////

//// [decoratorOnClassProperty6.ts]
declare function dec(target: Function): void;

class C {
    @dec prop;
}

//// [decoratorOnClassProperty6.js]
class C {
    @dec
    prop;
}
