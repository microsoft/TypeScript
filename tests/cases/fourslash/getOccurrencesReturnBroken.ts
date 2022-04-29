/// <reference path='fourslash.ts' />

////ret/*1*/urn;
////retu/*2*/rn;
////function f(a: number) {
////    if (a > 0) {
////        return (function () {
////            () => [|return|];
////            [|return|];
////            [|return|];
////
////            if (false) {
////                [|return|] true;
////            }
////        })() || true;
////    }
////
////    var unusued = [1, 2, 3, 4].map(x => { return 4 })
////
////    return;
////    return true;
////}
////
////class A {
////    ret/*3*/urn;
////    r/*4*/eturn 8675309;
////}

// Note: For this test, these 'return's get highlighted as a result of a parse recovery
//       where if an arrow function starts with a statement, we try to parse a body
//       as if it was missing curly braces. If the behavior changes in the future,
//       a change to this test is very much welcome.
verify.rangesAreOccurrences(false);

for (var i = 1; i <= test.markers().length; i++) {
    goTo.marker("" + i);

    switch (i) {
        case 0:
        case 1:
            verify.occurrencesAtPositionCount(0);
            break;
        case 3:
            verify.occurrencesAtPositionCount(1); // 'return' is an instance member
            break;
        case 4:
            verify.occurrencesAtPositionCount(4);
            break;
    }
}