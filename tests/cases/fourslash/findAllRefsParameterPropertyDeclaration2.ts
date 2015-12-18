/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor(public [|publicParam|]: number) {
////         let localPublic = [|publicParam|];
////         this.[|publicParam|] += 10;
////     }
//// }

let ranges = test.ranges();
verify.assertHasRanges(ranges);
for (let range of ranges) {
    goTo.position(range.start);

    verify.referencesCountIs(ranges.length);
    for (let expectedRange of ranges) {
        verify.referencesAtPositionContains(expectedRange);
    }
}