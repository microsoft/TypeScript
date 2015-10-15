/// <reference path="fourslash.ts" />
// @allowNonTsExtensions: true


// @Filename: refFile1.js
//// export var V = 1;

// @Filename: refFile2.js
//// export var V = "123"

// @Filename: refFile3.js
//// export var V = "123"

// @Filename: main.js
// @ResolveReference: true

//// import ref1 = require("refFile1");
//// var ref2 = require("refFile2");
//// ref1.V./*1*/;
//// ref2.V./*2*/;
//// var v = { x: require("refFile3") };
//// v.x./*3*/;
//// v.x.V./*4*/;

goTo.marker("1");
verify.completionListContains("toExponential");
goTo.marker("2");
verify.completionListContains("toLowerCase");
goTo.marker("3");
verify.completionListContains("V");
goTo.marker("4");
verify.completionListContains("toLowerCase");
