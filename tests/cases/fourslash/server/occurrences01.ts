/// <reference path="../fourslash.ts"/>

////foo: [|switch|] (10) {
////    [|case|] 1:
////    [|case|] 2:
////    [|case|] 3:
////        [|break|];
////        [|break|] foo;
////        co/*1*/ntinue;
////        contin/*2*/ue foo;
////}

let ranges = test.ranges();

for (let r of ranges) {
    goTo.position(r.start);
    verify.occurrencesAtPositionCount(ranges.length);

    for (let range of ranges) {
        verify.occurrencesAtPositionContains(range, false);
    }
}

for (let m of test.markers()) {
    goTo.position(m.position);
    verify.occurrencesAtPositionCount(0);
}