// @experimentalDecorators: true
// @emitDecoratorMetadata: true
function PropDeco(target: Object, propKey: string | symbol) { }

class A {
}

class B {
    @PropDeco
    x: "foo" | null;

    @PropDeco
    y: true | never;

    @PropDeco
    z: "foo" | undefined;

    @PropDeco
    a: null;

    @PropDeco
    b: never;

    @PropDeco
    c: undefined;

    @PropDeco
    d: undefined | null;

    @PropDeco
    e: symbol | null;

    @PropDeco
    f: symbol | A;

    @PropDeco
    g: A | null;

    @PropDeco
    h: null | B;

    @PropDeco
    j: null | symbol;
}