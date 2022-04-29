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

verify.completions(
    { marker: ["openString1", "openString2", "openString3"], exact: [] },
    { marker: ["inComment1", "inComment2", "inComment3", "inComment4", "inTypeAlias", "inComment5", "inRegExp1"], exact: undefined },
);
