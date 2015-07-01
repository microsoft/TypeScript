/// <reference path='fourslash.ts' />

////var v1 = '';
////" /*openString1*/
////var v2 = '';
////"/*openString2*/
////var v3 = '';
////" bar./*openString3*/
////var v4 = '';
////// bar./*inComment1*/
////var v6 = '';
////// /*inComment2*/
////var v7 = '';
/////** /*inComment3*/
////var v8 = '';
/////** /*inComment4*/ **/
////var v9 = '';
/////* /*inComment5*/
////var v11 = '';
////  // /*inComment6*/
////var v12 = '';
////type htm/*inTypeAlias*/
///
//////  /*inComment7*/
////foo;
////var v10 = /reg/*inRegExp1*/ex/;

test.markers().forEach((m) => {
    goTo.position(m.position, m.fileName);
    verify.completionListIsEmpty();
});
