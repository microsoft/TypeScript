/// <reference path='fourslash.ts' />

////// Abstract cannot appear here, won't get highlighted
////let c = /**/abstract class Foo {
////    [|abstract|] foo(): void;
////    [|abstract|] bar(): void;
////}

goTo.marker("1");
verify.occurrencesAtPositionCount(0);

// Still highlight occurrences even though abstract methods can only appear in abstract classes
const ranges = test.ranges();
for (let r of ranges) {
    goTo.position(r.start);
    verify.occurrencesAtPositionCount(ranges.length);

    for (let range of ranges) {
        verify.occurrencesAtPositionContains(range, false);
    }
}