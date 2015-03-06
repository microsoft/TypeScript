/// <reference path='fourslash.ts' />

/////**/for ([]of[]) { }


format.document();
goTo.marker();
verify.currentLineContentIs('for ([] of []) { }');