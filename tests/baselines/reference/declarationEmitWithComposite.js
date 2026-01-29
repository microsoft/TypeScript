//// [tests/cases/compiler/declarationEmitWithComposite.ts] ////

//// [test.ts]
interface Foo {
    x: number;
}
export default Foo;


//// [/foo/out/test.js]
export {};


//// [/foo/out/test.d.ts]
interface Foo {
    x: number;
}
export default Foo;
