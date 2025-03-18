//// [tests/cases/conformance/decorators/class/property/decoratorOnClassProperty12.ts] ////

//// [decoratorOnClassProperty12.ts]
declare function dec(): <T>(target: any, propertyKey: string) => void;

class A {
    @dec()
    foo: `${string}`
}


//// [decoratorOnClassProperty12.js]
class A {
    @dec()
    foo;
}
