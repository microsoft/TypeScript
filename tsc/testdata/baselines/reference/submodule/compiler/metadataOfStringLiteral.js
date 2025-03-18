//// [tests/cases/compiler/metadataOfStringLiteral.ts] ////

//// [metadataOfStringLiteral.ts]
function PropDeco(target: Object, propKey: string | symbol) { }

class Foo {
    @PropDeco
    public foo: "foo" | "bar";
}

//// [metadataOfStringLiteral.js]
function PropDeco(target, propKey) { }
class Foo {
    @PropDeco
    foo;
}
