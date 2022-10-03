/// <reference path='fourslash.ts' />

////t /*1*/ry {
////    t/*2*/ry {
////    }
////    ctch (x) {
////    }
////
////    tr {
////    }
////    fin/*3*/ally {
////    }
////}
////c/*4*/atch (e) {
////}
////f/*5*/inally {
////}
////
////// Missing catch variable
////t/*6*/ry {
////}
////catc/*7*/h {
////}
/////*8*/finally {
////}
////
////// Missing try entirely
////cat/*9*/ch (x) {
////}
////final/*10*/ly {
////}


for (var i = 1; i <= test.markers().length; i++) {
    goTo.marker("" + i);
    
    switch (i) {
        case 1:
            verify.occurrencesAtPositionCount(0);
            break;
        case 2:
        case 3:
            verify.occurrencesAtPositionCount(1);
            break;
        case 4:
        case 5:
        case 9:
        case 10:
            verify.occurrencesAtPositionCount(2);
            break;
        case 6:
        case 7:
        case 8:
            verify.occurrencesAtPositionCount(3);
            break;
    }
}