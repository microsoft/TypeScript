//// [tests/cases/compiler/jsFileCompilationExportAssignmentSyntax.ts] ////

//// [a.js]
export = b;

//// [a.js]
"use strict";
module.exports = b;
