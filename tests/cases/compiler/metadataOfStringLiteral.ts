// @experimentalDecorators: true
// @emitDecoratorMetadata: true
function PropDeco(target: Object, propKey: string | symbol) { }

class Foo {
    @PropDeco
    public foo: "foo" | "bar";
}