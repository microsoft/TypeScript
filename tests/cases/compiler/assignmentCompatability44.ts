class Foo {
    constructor(x: number) {}
}

const foo: { new(): Foo } = Foo;
