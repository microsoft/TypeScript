/// <reference path="fourslash.ts" />

////if (true) {     
////  //    
////   /*err*/}

goTo.marker('err');
edit.insert("\n");

verify.currentFileContentIs("if (true) {     \n  //    \n\n}");
