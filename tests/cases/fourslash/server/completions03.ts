/// <reference path="../fourslash.ts"/>

// issue: https://github.com/Microsoft/TypeScript/issues/10108

//// interface Foo {
////    one: any;
////    two: any;
//// }
////
//// let x: Foo = {
////     get one() { return "" },
////     /**/
//// }

goTo.marker("");
verify.completionListContains("two");
verify.not.completionListContains("one");
