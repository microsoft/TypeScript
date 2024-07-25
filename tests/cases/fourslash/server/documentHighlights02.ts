/// <reference path="../fourslash.ts"/>

// @Filename: a.ts
////function [|foo|] () {
////	return 1;
////}
////[|foo|]();

// @Filename: b.ts
/////// <reference path="a.ts"/>
////[|foo|]();

// open two files
goTo.file("a.ts");
goTo.file("b.ts");

verify.baselineDocumentHighlights(test.ranges(), { filesToSearch: ["a.ts", "b.ts"] });
