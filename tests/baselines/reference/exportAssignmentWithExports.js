//// [tests/cases/compiler/exportAssignmentWithExports.ts] ////

//// [exportAssignmentWithExports.ts]
export class C { }
class D { }
export = D;

//// [exportAssignmentWithExports.js]
"use strict";
exports.C = void 0;
class C {
}
class D {
}
module.exports = D;
