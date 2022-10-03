/// <reference path='fourslash.ts' />

//// export interface Foo {
////   bar: string;
//// }
//// export const x: [|Foo.bar|] = ""

verify.rangeAfterCodeFix(`Foo["bar"]`);
