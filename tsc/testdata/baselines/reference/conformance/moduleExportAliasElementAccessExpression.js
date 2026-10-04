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
export { D };
export { D as "Does not work yet" };
declare function D(): void;
