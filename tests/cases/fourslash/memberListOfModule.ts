/// <reference path='fourslash.ts' />

////module Foo {
////  export class Bar {
////
////  }
////
////
////  export module Blah {
////
////  }
////}
////
////var x: Foo./**/

verify.completions({ marker: "", exact: "Bar" });
