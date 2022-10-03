/// <reference path='fourslash.ts' />

////if(false){debugger;}
////  if    (   false   )   {    debugger  ;   }

format.document();
goTo.bof();
verify.currentLineContentIs("if (false) { debugger; }");
goTo.eof();
verify.currentLineContentIs("if (false) { debugger; }");