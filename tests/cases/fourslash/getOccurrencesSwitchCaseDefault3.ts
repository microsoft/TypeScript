/// <reference path='fourslash.ts' />

////foo: [|switch|] (1) {
////    [|case|] 1:
////    [|case|] 2:
////        [|break|];
////    [|case|] 3:
////        switch (2) {
////            case 1:
////                [|break|] foo;
////                continue; // invalid
////            default:
////                break;
////        }
////    [|default|]:
////        [|break|];
////}

test.ranges().forEach(r => {
    goTo.position(r.start);
    verify.occurrencesAtPositionCount(test.ranges().length);

    test.ranges().forEach(range => {
        verify.occurrencesAtPositionContains(range, false);
    });
});
