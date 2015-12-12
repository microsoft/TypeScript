/// <reference path='fourslash.ts'/>

//// class Foo {
////     constructor(private |privateParam|: number) {
////         let localPrivate = |privateParam|;
////         this.|privateParam| += 10;
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