// @target: es2015
class Foo {
    constructor(x: number) {}
}

const foo: { new(): Foo } = Foo;
