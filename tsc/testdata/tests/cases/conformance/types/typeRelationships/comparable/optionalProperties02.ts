// @target: es2015
// @strictNullChecks: true
// @declaration: true

interface Foo {
    a?: string;
    b: string;
}

<Foo>{ a: undefined };