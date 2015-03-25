/// <reference path='fourslash.ts' />

////(d, defaultIsAnInvalidParameterName) => d/*1*/

goTo.marker("1");
verify.completionListContains("d");
verify.completionListContains("defaultIsAnInvalidParameterName");

// This should probably stop working in the future.
verify.completionListContains("default", "default", /*documentation*/ undefined, "keyword");