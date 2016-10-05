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