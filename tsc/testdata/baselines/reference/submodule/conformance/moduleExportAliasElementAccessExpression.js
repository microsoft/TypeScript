//// [tests/cases/conformance/salsa/moduleExportAliasElementAccessExpression.ts] ////

//// [moduleExportAliasElementAccessExpression.js]
function D () { }
exports["D"] = D;
 // (the only package I could find that uses spaces in identifiers is webidl-conversions)
exports["Does not work yet"] = D;


//// [moduleExportAliasElementAccessExpression.js]
function D() { }
export var D = D;
exports["D"] = D;
// (the only package I could find that uses spaces in identifiers is webidl-conversions)
export var Does not work yet = D;
// (the only package I could find that uses spaces in identifiers is webidl-conversions)
exports["Does not work yet"] = D;


//// [moduleExportAliasElementAccessExpression.d.ts]
declare function D(): void;
declare const _exported: typeof D;
export { _exported as "D" };
declare const _exported_1: typeof D;
export { _exported_1 as "Does not work yet" };
