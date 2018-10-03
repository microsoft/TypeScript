/// <reference path='fourslash.ts' />

//// export interface Foo {
////   bar: string;
//// }
//// const x: [|Foo.bar|] = ""

verify.rangeAfterCodeFix(`Foo["bar"]`);
