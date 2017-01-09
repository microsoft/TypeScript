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

goTo.marker();
verify.completionListCount(2);
verify.completionListContains('Bar');
verify.completionListContains('Blah');