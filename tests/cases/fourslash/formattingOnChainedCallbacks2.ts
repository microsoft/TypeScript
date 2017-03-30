/// <reference path='fourslash.ts' />

////Promise
////    .then(
////    /*then1cb1*/cb,
////    /*then1cb2*/cb2,
////    /*then1*/)
////    .then(
////    /*then2cb1*/cb,
////    /*then2cb2*/cb2,
////    /*then2*/)
////    .then();

format.document();
verify.currentFileContentIs("");
// goTo.marker('then1cb1');
// verify.indentationIs(8);
// goTo.marker('then1cb2');
// verify.indentationIs(8);
// goTo.marker('then1');
// verify.indentationIs(4);

// goTo.marker('then2cb1');
// verify.indentationIs(8);
// goTo.marker('then2cb2');
// verify.indentationIs(8);
// goTo.marker('then2');
// verify.indentationIs(4);