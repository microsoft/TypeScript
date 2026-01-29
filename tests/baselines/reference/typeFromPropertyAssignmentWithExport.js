//// [tests/cases/conformance/salsa/typeFromPropertyAssignmentWithExport.ts] ////

//// [a.js]
// this is a javascript file...

export const Adapter = {};

Adapter.prop = {};

// comment this out, and it works
Adapter.asyncMethod = function() {}

//// [a.js]
// this is a javascript file...
export const Adapter = {};
Adapter.prop = {};
// comment this out, and it works
Adapter.asyncMethod = function () { };
