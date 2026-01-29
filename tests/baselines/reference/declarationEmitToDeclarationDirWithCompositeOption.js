//// [tests/cases/compiler/declarationEmitToDeclarationDirWithCompositeOption.ts] ////

//// [test.ts]
interface Foo {
    x: number;
}
export default Foo;


//// [test.js]
export {};


//// [test.d.ts]
interface Foo {
    x: number;
}
export default Foo;
