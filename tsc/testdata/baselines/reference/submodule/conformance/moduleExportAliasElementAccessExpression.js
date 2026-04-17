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
export { D as "D" };
export { D as "Does not work yet" };


//// [DtsFileErrors]


out/moduleExportAliasElementAccessExpression.d.ts(2,15): error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
out/moduleExportAliasElementAccessExpression.d.ts(3,15): error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.


==== out/moduleExportAliasElementAccessExpression.d.ts (2 errors) ====
    declare function D(): void;
    export { D as "D" };
                  ~~~
!!! error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
    export { D as "Does not work yet" };
                  ~~~~~~~~~~~~~~~~~~~
!!! error TS18057: String literal import and export names are not supported when the '--module' flag is set to 'es2015' or 'es2020'.
    