/// <reference path="fourslash.ts" /> 
////1 ? fun/*1*/ 
////function func () {} 
 
goTo.marker("1"); 
verify.completionListContains("func");
