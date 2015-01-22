/// <reference path='fourslash.ts' />

////function [|__foo|]() {
////    [|__foo|]();
////}

test.ranges().forEach(r => {
    goTo.position(r.start);
    verify.referencesCountIs(2);

    test.ranges().forEach(range => {
        verify.referencesAtPositionContains(range);
    });
});