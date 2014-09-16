/// <reference path='fourslash.ts' />

////foo: [|switch|] (10) {
////    [|case|] 1:
////    [|case|] 2:
////    [|case|] 3:
////        [|break|];
////        [|break|] foo;
////        co/*1*/ntinue;
////        contin/*2*/ue foo;
////}

test.ranges().forEach(r => {
    goTo.position(r.start);
    verify.occurrencesAtPositionCount(test.ranges().length);

    test.ranges().forEach(range => {
        verify.occurrencesAtPositionContains(range, false);
    });
});

test.markers().forEach(m => {
    goTo.position(m.position);
    verify.occurrencesAtPositionCount(0);
});