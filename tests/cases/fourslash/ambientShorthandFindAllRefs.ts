/// <reference path='fourslash.ts' />

// @Filename: declarations.d.ts
////declare module "jquery";

// @Filename: user.ts
////import {[|x|]} from "jquery";

// @Filename: user2.ts
////import {[|x|]} from "jquery";

let ranges = test.ranges();
for (let range of ranges) {
    goTo.file(range.fileName);
    goTo.position(range.start);

    verify.referencesCountIs(ranges.length);
    for (let expectedRange of ranges) {
        verify.referencesAtPositionContains(expectedRange);
    }
}
