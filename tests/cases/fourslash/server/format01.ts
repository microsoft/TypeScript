/// <reference path="../fourslash.ts"/>

// @lib: es5

/////**/namespace Default{var x= ( { } ) ;}


format.document();
goTo.marker();
verify.currentLineContentIs('namespace Default { var x = ({}); }');