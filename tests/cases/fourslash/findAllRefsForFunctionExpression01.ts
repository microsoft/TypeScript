/// <reference path='fourslash.ts'/>

// @Filename: file1.ts
////var foo = function [|foo|](a = [|foo|](), b = () => [|foo|]) {
////    [|foo|]([|foo|], [|foo|]);
////}

// @Filename: file2.ts
/////// <reference path="file1.ts" />
////foo();


let ranges = test.ranges()
for (let range of ranges) {
    goTo.position(range.start);

    verify.referencesCountIs(ranges.length);
    for (let expectedReference of ranges) {
        verify.referencesAtPositionContains(expectedReference);
    }
}