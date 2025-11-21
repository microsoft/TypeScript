/// <reference path='fourslash.ts' />

/////**/namespace Default{var x= ( { } ) ;}


format.document();
goTo.marker();
verify.currentLineContentIs('namespace Default { var x = ({}); }');