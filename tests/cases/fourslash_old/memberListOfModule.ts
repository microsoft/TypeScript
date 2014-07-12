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
verify.memberListCount(2);
verify.memberListContains('Bar');
verify.memberListContains('Blah');