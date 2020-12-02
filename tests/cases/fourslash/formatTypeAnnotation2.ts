/// <reference path='fourslash.ts' />

////function foo(x : number, y ?: string) : number {}
////interface Foo {
////    x : number;
////    y ?: number;
////}

format.document();
verify.currentFileContentIs(
`function foo(x: number, y?: string): number { }
interface Foo {
    x: number;
    y?: number;
}`
);
