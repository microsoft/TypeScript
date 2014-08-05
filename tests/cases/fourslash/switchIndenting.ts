/// <reference path='fourslash.ts' />

////switch (null) {
////    case 0:
////        /**/
////}

goTo.marker();
edit.insert('case 1:\n');

// ideally would be 8
//verify.indentationIs(8);
verify.indentationIs(4);
