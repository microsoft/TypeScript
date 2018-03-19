/// <reference path="fourslash.ts" />

////const foo = 0;
////interface I {
////    m(): void;
////    fo/*i*/
////}
////type T = { fo/*t*/ };

//verify.completionsAt("i", ["readonly"]);
verify.completionsAt("t", ["readonly"]);
