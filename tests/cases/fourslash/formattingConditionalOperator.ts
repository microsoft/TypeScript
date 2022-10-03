/// <reference path='fourslash.ts'/>

////var x=true?1:2
format.document();
goTo.bof();
verify.currentLineContentIs("var x = true ? 1 : 2");