//// [tests/cases/compiler/decoratorMetadataNoStrictNull.ts] ////

//// [decoratorMetadataNoStrictNull.ts]
const dec = (obj: {}, prop: string) => undefined

class Foo {
  @dec public foo: string | null;
  @dec public bar: string;
}

//// [decoratorMetadataNoStrictNull.js]
const dec = (obj, prop) => undefined;
class Foo {
    @dec
    foo;
    @dec
    bar;
}
