// @strictNullChecks:true

interface Foo {
    x?: number;
}

interface Bar {
    x?: number;
}

interface Foo2 {
    x: number | undefined;
}

const foo: Foo = { x: undefined }; // should error
const foo2: Foo2 = { x: undefined }; // ok
const foo3: Foo2 = {  }; // should error
const foo4: Foo = {  }; // ok
const foo5: Foo2 = foo; // should error
const foo6: Foo = foo2; // should error

declare const something: Bar;
let f: Foo = something;
