/// <reference path="fourslash.ts" />

////module m {
////    import foo = module('_foo');
////    var n: num/**/
////}

goTo.marker();

verify.completionListContains('number');
