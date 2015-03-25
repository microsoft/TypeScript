/// <reference path='fourslash.ts' />

////(d, defaultIsAnInvalidParameterName) => default/*1*/

goTo.marker("1");
verify.completionListContains("defaultIsAnInvalidParameterName");

// This should probably stop working in the future.
verify.completionListContains("default", "default", /*documentation*/ undefined, "keyword");