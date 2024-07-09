///<reference path="fourslash.ts"/>

////var x = [1 , 2];/*x*/
////var y = ( 1  , 2 );/*y*/
////var z1 = 1 , zz = 2;/*z1*/
////var z2 = {
////    x: 1 ,/*z2*/
////    y: 2
////};
////var z3 = (
////    () => { }  ,/*z3*/
////    () => { }
////    );
////var z4 = [
////    () => { } ,/*z4*/
////    () => { }
////];
////var z5 = {
////    x: () => { } ,/*z5*/
////    y: () => { }
////}; 

format.document();
goTo.marker('x');
verify.currentLineContentIs("var x = [1, 2];");
goTo.marker('y');
verify.currentLineContentIs("var y = (1, 2);");
goTo.marker('z1');
verify.currentLineContentIs("var z1 = 1, zz = 2;");
goTo.marker('z2');
verify.currentLineContentIs("    x: 1,");
goTo.marker('z3');
verify.currentLineContentIs("    () => { },");
goTo.marker('z4');
verify.currentLineContentIs("    () => { },");
goTo.marker('z5');
verify.currentLineContentIs("    x: () => { },");