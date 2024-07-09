// @experimentalDecorators: true
// @emitDecoratorMetadata: true
const dec = (obj: {}, prop: string) => undefined

class Foo {
  @dec public foo: string | null;
  @dec public bar: string;
}