/// <reference path="../fourslash.ts"/>

// @Filename: a.ts
////function foo() {
////	return 1;
////}

// @Filename: b.ts
/////// <reference path="a.ts"/>
////[|foo|]();


let ranges = test.ranges();

for (let r of ranges) {
    goTo.position(r.start);
    verify.documentHighlightsAtPositionCount(2, ["b.ts"]);

    /*for (let range of ranges) {
        verify.documentHighlightsAtPositionContains(range, ["a.ts"]);
    }*/
}

