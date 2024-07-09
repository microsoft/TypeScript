/// <reference path="fourslash.ts" />

//// // @Filename: exportEqualsInterface_A.ts
//// interface A {
//// 	p1: number;
//// }
//// 
//// export = A;
//// /*1*/
//// var i: I1;
//// 
//// var n: number = i.p1;

edit.disableFormatting();

goTo.marker('1');

//edit.insert("\nimport I1 = module(\"exportEqualsInterface_A\");\n");
