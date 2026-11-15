// @target:es5, es2015
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

class G {
    @dec get x(): string { return ""; }
    set x(value) { }
}

class H {
    get x(): string { return ""; }
    @dec set x(value) { }
}

class I {
    @dec set x(value) { }
    get x(): string { return ""; }
}

class J {
    set x(value) { }
    @dec get x(): string { return ""; }
}

class K {
    @dec get x(): string { return ""; }
}

class L {
    @dec get x(): string { return ""; }
    set x(value: any) { }
}

class M {
    @dec static get x(): number { return 0; }
    static set x(value) { }
}
