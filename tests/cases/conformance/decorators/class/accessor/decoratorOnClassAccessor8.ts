// @target: es5
// @experimentaldecorators: true
// @emitdecoratormetadata: true
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

const A1 = class {
    @dec get x() { return 0; }
    set x(value: number) { }
}

const B1 = class {
    get x() { return 0; }
    @dec set x(value: number) { }
}

const C1 = class {
    @dec set x(value: number) { }
    get x() { return 0; }
}

const D1 = class {
    set x(value: number) { }
    @dec get x() { return 0; }
}

const E1 = class {
    @dec get x() { return 0; }
}

const F1 = class {
    @dec set x(value: number) { }
}
