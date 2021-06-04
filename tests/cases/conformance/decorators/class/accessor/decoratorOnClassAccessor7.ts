// @target: es5
// @experimentaldecorators: true
declare function dec1<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;
declare function dec2<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T>;

class A {
    @dec1 get x() { return 0; }
    set x(value: number) { }
}

class B {
    get x() { return 0; }
    @dec2 set x(value: number) { }
}

class C {
    @dec1 set x(value: number) { }
    get x() { return 0; }
}

class D {
    set x(value: number) { }
    @dec2 get x() { return 0; }
}

class E {
    @dec1 get x() { return 0; }
    @dec2 set x(value: number) { }
}

class F {
    @dec1 set x(value: number) { }
    @dec2 get x() { return 0; }
}

const A1 = class {
    @dec1 get x() { return 0; }
    set x(value: number) { }
}

const B1 = class {
    get x() { return 0; }
    @dec2 set x(value: number) { }
}

const C1 = class {
    @dec1 set x(value: number) { }
    get x() { return 0; }
}

const D1 = class {
    set x(value: number) { }
    @dec2 get x() { return 0; }
}

const E1 = class {
    @dec1 get x() { return 0; }
    @dec2 set x(value: number) { }
}

const F1 = class {
    @dec1 set x(value: number) { }
    @dec2 get x() { return 0; }
}
