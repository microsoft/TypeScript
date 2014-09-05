/// <reference path='fourslash.ts' />

////switch (10) {
////    case 1:
////    case 2:
////    case 4:
////    case 8:
////        foo: [|swi/*1*/tch|] (20) {
////            [|/*2*/case|] 1:
////            [|cas/*3*/e|] 2:
////                [|b/*4*/reak|];
////            [|defaul/*5*/t|]:
////                break foo;
////        }
////    case 0xBEEF:
////    default:
////        break;
////    case 16:
////}


for (var i = 1; i <= test.markers().length; i++) {
    goTo.marker("" + i);
    verify.occurrencesAtPositionCount(5);

    test.ranges().forEach(range => {
        verify.occurrencesAtPositionContains(range, false);
    });
}
