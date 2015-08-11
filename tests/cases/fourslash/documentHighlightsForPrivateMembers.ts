/// <reference path='fourslash.ts'/>

// @Filename: file1.ts
////class A {
////	private [|x|]: number;
////}

// @Filename: file2.ts
//// new A()./*1*/[|x|]

goTo.marker("1");
let ranges = test.ranges();

for (let r of ranges) {
	verify.documentHighlightsAtPositionContains(r, ["file1.ts", "file2.ts"]);
}