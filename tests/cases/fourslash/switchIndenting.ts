/// <reference path='fourslash.ts' />

////switch (null) {
////    case 0:
////        /**/
////}

goTo.marker();
edit.insert('case 1:\n');

verify.indentationIs(8);