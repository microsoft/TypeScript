/// <reference path="../fourslash.ts"/>

// @Filename: a.ts
////function [|foo|] () {
////	return 1;
////}
////[|foo|]();

// @Filename: b.ts
/////// <reference path="a.ts"/>
////foo();

// open two files
goTo.file("a.ts");
goTo.file("b.ts");

let ranges = test.ranges();

for (let i = 0; i < ranges.length; ++i) {
	let r = ranges[i];

	if (i < 2) {
		goTo.file("a.ts");
	}
	else {
		goTo.file("b.ts");
	}

    goTo.position(r.start);
    verify.documentHighlightsAtPositionCount(3, ["a.ts", "b.ts"]);

    for (let range of ranges) {
        verify.documentHighlightsAtPositionContains(range, ["a.ts", "b.ts"]);
    }
}
