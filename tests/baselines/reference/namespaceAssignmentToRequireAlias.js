//// [tests/cases/conformance/salsa/namespaceAssignmentToRequireAlias.ts] ////

//// [index.js]
module.exports = {}

//// [bug40140.js]
const u = require('untyped');
u.assignment.nested = true
u.noError()



//// [bug40140.js]
"use strict";
var u = require('untyped');
u.assignment.nested = true;
u.noError();


//// [bug40140.d.ts]
export {};
