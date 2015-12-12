/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor(protected |protectedParam|: number) {
////         let localProtected = |protectedParam|;
////         this.|protectedParam| += 10;
////     }
//// }

let ranges = test.ranges();
for (let range of ranges) {
    goTo.position(range.start);

    verify.referencesCountIs(ranges.length);
    for (let expectedRange of ranges) {
        verify.referencesAtPositionContains(expectedRange);
    }
}