/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor(protected [|protectedParam|]: number) {
////         let localProtected = [|protectedParam|];
////         this.[|protectedParam|] += 10;
////     }
//// }

const ranges = test.ranges();
verify.assertHasRanges(ranges);
for (const range of ranges) {
    goTo.position(range.start);

    verify.referencesCountIs(ranges.length);
    for (const expectedRange of ranges) {
        verify.referencesAtPositionContains(expectedRange);
    }
}