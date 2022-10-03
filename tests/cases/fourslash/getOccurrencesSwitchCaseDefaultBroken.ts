/// <reference path='fourslash.ts' />

////swi/*1*/tch(10) {
////    case 1:
////    case 2:
////    c/*2*/ase 4:
////    case 8:
////    case 0xBEEF:
////    de/*4*/fult: 
////        break;
////    /*5*/cas 16:
////    c/*3*/ase 12:
////        function f() {
////            br/*11*/eak;
////            /*12*/break;
////        }
////}
////
////sw/*6*/itch (10) {
////    de/*7*/fault
////    case 1:
////    case 2
////
////    c/*8*/ose 4:
////    case 8:
////    case 0xBEEF:
////        bre/*9*/ak;
////    case 16:
////        () => bre/*10*/ak;
////}

for (var i = 1; i <= test.markers().length; i++) {
    goTo.marker("" + i);

    switch (i) {
        case 1:
        case 2:
        case 3:
            verify.occurrencesAtPositionCount(8);
            break;
        case 4:
            verify.occurrencesAtPositionCount(1);
            break;
        case 6:
        case 7:
        case 9:
            verify.occurrencesAtPositionCount(8);
            break;
        case 5:
        case 8:
        case 10:
        case 11:
        case 12:
            verify.occurrencesAtPositionCount(0);
            break;
    }
}