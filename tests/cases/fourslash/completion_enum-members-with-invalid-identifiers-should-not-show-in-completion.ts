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

verify.completionsAt("", ["1", "2", "3", "a", "b"]);
