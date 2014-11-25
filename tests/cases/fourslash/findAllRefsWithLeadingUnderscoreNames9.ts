/// <reference path='fourslash.ts' />

////(function [|___foo|]() {
////    [|___foo|]();
////})

test.ranges().forEach(r => {
    goTo.position(r.start);
    verify.referencesCountIs(2);

    test.ranges().forEach(range => {
        verify.referencesAtPositionContains(range);
    });
});