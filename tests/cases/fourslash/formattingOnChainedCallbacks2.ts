/// <reference path='fourslash.ts' />

////Promise.then(
/////*then1cb1*/cb,
////    );
////Promise
////    .then(
/////*then2cb1*/cb,
////    );

format.document();
goTo.marker('then1cb1');
verify.currentLineContentIs("    cb,");

goTo.marker('then2cb1');
verify.currentLineContentIs("        cb,");