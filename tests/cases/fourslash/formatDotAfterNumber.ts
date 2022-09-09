/// <reference path='fourslash.ts' />

////1+ 2 .toString() +3/**/

format.document();
goTo.marker("");
verify.currentLineContentIs("1 + 2 .toString() + 3");
