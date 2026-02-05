//// [tests/cases/conformance/salsa/moduleExportAliasElementAccessExpression.ts] ////

//// [moduleExportAliasElementAccessExpression.js]
function D () { }
exports["D"] = D;
 // (the only package I could find that uses spaces in identifiers is webidl-conversions)
exports["Does not work yet"] = D;


//// [moduleExportAliasElementAccessExpression.js]
"use strict";
function D() { }
exports["D"] = D;
// (the only package I could find that uses spaces in identifiers is webidl-conversions)
exports["Does not work yet"] = D;


//// [moduleExportAliasElementAccessExpression.d.ts]
declare function D(): void;
declare const _exported: typeof D;
export { _exported as "D" };
declare const _exported_1: typeof D;
export { _exported_1 as "Does not work yet" };


//// [DtsFileErrors]


out/moduleExportAliasElementAccessExpression.d.ts(3,23): error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
out/moduleExportAliasElementAccessExpression.d.ts(5,25): error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.


==== out/moduleExportAliasElementAccessExpression.d.ts (2 errors) ====
    declare function D(): void;
    declare const _exported: typeof D;
    export { _exported as "D" };
                          ~~~
!!! error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
    declare const _exported_1: typeof D;
    export { _exported_1 as "Does not work yet" };
                            ~~~~~~~~~~~~~~~~~~~
!!! error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
    