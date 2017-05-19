/// <reference path='fourslash.ts' />

//// var v1 = '';
//// " /*openString1*/
//// var v2 = '';
//// "/*openString2*/
//// var v3 = '';
//// " bar./*openString3*/
//// var v4 = '';
//// // bar./*inComment1*/
//// var v6 = '';
//// // /*inComment2*/
//// var v7 = '';
//// /* /*inComment3*/
//// var v11 = '';
////   // /*inComment4*/
//// var v12 = '';
//// type htm/*inTypeAlias*/
////
//// //  /*inComment5*/
//// foo;
//// var v10 = /reg/*inRegExp1*/ex/;

goTo.eachMarker(() => verify.completionListIsEmpty());
