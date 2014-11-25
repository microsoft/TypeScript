/// <reference path='fourslash.ts' />

////(function [|foo|](): number {
////    var x = [|foo|];
////    return 0;
////})


test.ranges().forEach(r => {
    goTo.position(r.start);
    verify.occurrencesAtPositionCount(2);

    test.ranges().forEach(range => {
        verify.occurrencesAtPositionContains(range);
    });
});