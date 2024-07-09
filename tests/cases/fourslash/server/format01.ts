/// <reference path="../fourslash.ts"/>

/////**/module Default{var x= ( { } ) ;}


format.document();
goTo.marker();
verify.currentLineContentIs('module Default { var x = ({}); }');