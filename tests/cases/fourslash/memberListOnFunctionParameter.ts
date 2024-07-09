/// <reference path='fourslash.ts' />

////module Test10 {
////    var x: string[] = [];
////    x.forEach(function (y) { y./**/} );
////}

verify.completions({
    marker: "",
    includes: "charAt",
    excludes: "toFixed",
});
