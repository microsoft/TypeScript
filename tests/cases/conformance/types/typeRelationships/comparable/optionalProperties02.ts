// @strictNullChecks: true
// @declaration: true

interface Foo {
    a?: string;
    b: string;
}

<Foo>{ a: undefined };