/// <reference path="../fourslash.ts"/>

// @Filename: a.ts
////function [|f|](x: typeof [|f|]) {
////    [|f|]([|f|]);
////}

let ranges = test.ranges();

for (let r of ranges) {
    goTo.position(r.start);
    verify.documentHighlightsAtPositionCount(ranges.length, ["a.ts"]);

    for (let range of ranges) {
        verify.documentHighlightsAtPositionContains(range, ["a.ts"]);
    }
}

