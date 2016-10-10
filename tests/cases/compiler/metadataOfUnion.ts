// @experimentalDecorators: true
// @emitDecoratorMetadata: true
function PropDeco(target: Object, propKey: string | symbol) { }

class A {
}

class B {
    @PropDeco
    x: "foo" | A;

    @PropDeco
    y: true | boolean;

    @PropDeco
    z: "foo" | boolean;
}

enum E {
    A,
    B,
    C,
    D
}

class D {
    @PropDeco
    a: E.A;

    @PropDeco
    b: E.B | E.C;

    @PropDeco
    c: E;

    @PropDeco
    d: E | number;
}