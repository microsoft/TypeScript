/// <reference path='fourslash.ts'/>

//// enum e {
////     "1",
////     2 = 3,
////     3,
////     a,
////     b
//// }
////
//// e./**/

verify.completionsAt("", ["a", "b"]);
