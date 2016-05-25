/// <reference path='fourslash.ts'/>

////interface I { [|boom|](): void; }
////new class C implements I {
////   [|boom|](){}
////}

let ranges = test.ranges()
for (let range of ranges) {
    goTo.position(range.start);

    verify.referencesCountIs(ranges.length);
    for (let expectedReference of ranges) {
        verify.referencesAtPositionContains(expectedReference);
    }
}