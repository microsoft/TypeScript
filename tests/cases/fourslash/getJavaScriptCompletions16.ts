/// <reference path="fourslash.ts" />
// @allowNonTsExtensions: true


// @Filename: refFile1.js
//// export var V = 1;

// @Filename: refFile2.js
//// export var V = "123"

// @Filename: main.js
// @ResolveReference: true

////define ("main", ["refFile1", "refFile2"], function(ref1, ref2) {
////    ref1.V./*1*/;
////    ref2.V./*2*/;
////});

goTo.marker("1");
verify.completionListContains("toExponential");
goTo.marker("2");
verify.completionListContains("toLowerCase");
