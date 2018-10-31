/// <reference path='fourslash.ts' />

////module m {
////    import foo = module(_foo);
////    var n: num/*1*/
////}

verify.completions({ marker: "1", exact: completion.globalTypes });
