/// <reference path="fourslash.ts" />

////module m {
////    import foo = module('_foo');
////    var n: num/**/
////}

verify.completions({ marker: "", includes: "number" });
