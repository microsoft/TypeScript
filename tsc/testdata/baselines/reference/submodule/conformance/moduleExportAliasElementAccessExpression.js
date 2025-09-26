//// [tests/cases/conformance/salsa/moduleExportAliasElementAccessExpression.ts] ////

//// [moduleExportAliasElementAccessExpression.js]
function D () { }
exports["D"] = D;
 // (the only package I could find that uses spaces in identifiers is webidl-conversions)
exports["Does not work yet"] = D;


//// [moduleExportAliasElementAccessExpression.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function D() { }
export var D = D;
exports["D"] = D;
// (the only package I could find that uses spaces in identifiers is webidl-conversions)
export var Does not work yet = D;
// (the only package I could find that uses spaces in identifiers is webidl-conversions)
exports["Does not work yet"] = D;


//// [moduleExportAliasElementAccessExpression.d.ts]
export var D = D;
export var Does not work yet = D;
export {};


//// [DtsFileErrors]


out/moduleExportAliasElementAccessExpression.d.ts(2,17): error TS1005: ',' expected.
out/moduleExportAliasElementAccessExpression.d.ts(2,21): error TS1005: ',' expected.
out/moduleExportAliasElementAccessExpression.d.ts(2,26): error TS1005: ',' expected.


==== out/moduleExportAliasElementAccessExpression.d.ts (3 errors) ====
    export var D = D;
    export var Does not work yet = D;
                    ~~~
!!! error TS1005: ',' expected.
                        ~~~~
!!! error TS1005: ',' expected.
                             ~~~
!!! error TS1005: ',' expected.
    export {};
    