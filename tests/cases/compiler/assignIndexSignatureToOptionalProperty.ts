// #27144

interface Foo {
    a: number;
    b?: string;
}
interface Foo2 {
    a: number;
    b?: number;
}
interface Bar {
    a: number;
    [n: string]: number;
}
let b: Bar = { a: 42, b: 43 };
// Error, index signature does not match optional property `b`
let f: Foo = b;
// OK
let f2: Foo2 = b;
