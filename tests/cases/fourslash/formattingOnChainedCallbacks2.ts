/// <reference path='fourslash.ts' />

////Promise
////    .then(
/////*then1cb1*/cb
////    /*then1*/);

////Promise
////    .then(
/////*then2cb1*/cb,
////    /*then2*/);

////Promise
////    ["then"](/*then3_1*/
/////*then3cb1*/cb,
////    /*then3*/);

format.document();
goTo.marker('then1cb1');
verify.currentLineContentIs("        cb");
goTo.marker('then1');
verify.currentLineContentIs("    );");

goTo.marker('then2cb1');
verify.currentLineContentIs("        cb,");
goTo.marker('then2');
verify.currentLineContentIs("    );");

goTo.marker('then3_1');
verify.currentLineContentIs(`    ["then"](`);
goTo.marker('then3cb1');
verify.currentLineContentIs("        cb,");
goTo.marker('then3');
verify.currentLineContentIs("    );");