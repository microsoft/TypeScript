/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor(private [|privateParam|]: number) {
////         let localPrivate = [|privateParam|];
////         this.[|privateParam|] += 10;
////     }
//// }

const ranges = test.ranges();
verify.assertHasRanges(ranges);
for (const range of ranges) {
    goTo.position(range.start);

    if (ranges.length) {
        verify.referencesCountIs(ranges.length);
        for (const expectedRange of ranges) {
            verify.referencesAtPositionContains(expectedRange);
        }
    }
}