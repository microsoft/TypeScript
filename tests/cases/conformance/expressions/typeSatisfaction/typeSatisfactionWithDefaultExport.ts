// @module: esnext

// @filename: ./a.ts
interface Foo {
    a: number;
}
export default {} satisfies Foo;

// @filename: ./b.ts
interface Foo {
    a: number;
}
export default { a: 1 } satisfies Foo;
