/// <reference path='fourslash.ts' />

////[|sw/*1*/itch|] (10) {
////    [|/*2*/case|] 1:
////    [|cas/*3*/e|] 2:
////    [|c/*4*/ase|] 4:
////    [|c/*5*/ase|] 8:
////        foo: switch (20) {
////            case 1:
////            case 2:
////                break;
////            default:
////                break foo;
////        }
////    [|cas/*6*/e|] 0xBEEF:
////    [|defa/*7*/ult|]:
////        [|bre/*9*/ak|];
////    [|/*8*/case|] 16:
////}


for (var i = 1; i <= test.markers().length; i++) {
    goTo.marker("" + i);
    verify.occurrencesAtPositionCount(9);

    test.ranges().forEach(range => {
        verify.occurrencesAtPositionContains(range, false);
    });
}
