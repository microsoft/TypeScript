/// <reference path='fourslash.ts' />

////namespace Foo {
////  export class Bar {
////
////  }
////
////
////  export namespace Blah {
////
////  }
////}
////
////var x: Foo./**/

verify.completions({ marker: "", exact: "Bar" });
