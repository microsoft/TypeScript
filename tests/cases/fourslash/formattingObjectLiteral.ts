/// <reference path='fourslash.ts' />

////var clear = {
////"a": 1/**/
////}


format.document();
goTo.marker();
verify.currentLineContentIs('    "a": 1');