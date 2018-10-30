/// <reference path="../fourslash.ts"/>

// issue: https://github.com/Microsoft/TypeScript/issues/10108

//// interface Foo {
////    one: any;
////    two: any;
////    three: any;
//// }
////
//// let x: Foo = {
////     get one() { return "" },
////     set two(t) {},
////     /**/
//// }

verify.completions({ marker: "", exact: "three" });
