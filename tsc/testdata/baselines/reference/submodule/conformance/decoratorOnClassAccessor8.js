//// [tests/cases/conformance/decorators/class/accessor/decoratorOnClassAccessor8.ts] ////

//// [decoratorOnClassAccessor8.ts]
declare function dec<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class A {
    @dec get x() { return 0; }
    set x(value: number) { }
}

class B {
    get x() { return 0; }
    @dec set x(value: number) { }
}

class C {
    @dec set x(value: number) { }
    get x() { return 0; }
}

class D {
    set x(value: number) { }
    @dec get x() { return 0; }
}

class E {
    @dec get x() { return 0; }
}

class F {
    @dec set x(value: number) { }
}

//// [decoratorOnClassAccessor8.js]
class A {
    @dec
    get x() { return 0; }
    set x(value) { }
}
class B {
    get x() { return 0; }
    @dec
    set x(value) { }
}
class C {
    @dec
    set x(value) { }
    get x() { return 0; }
}
class D {
    set x(value) { }
    @dec
    get x() { return 0; }
}
class E {
    @dec
    get x() { return 0; }
}
class F {
    @dec
    set x(value) { }
}
