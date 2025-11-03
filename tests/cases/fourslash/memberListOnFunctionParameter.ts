/// <reference path='fourslash.ts' />

////namespace Test10 {
////    var x: string[] = [];
////    x.forEach(function (y) { y./**/} );
////}

verify.completions({
    marker: "",
    includes: "charAt",
    excludes: "toFixed",
});
