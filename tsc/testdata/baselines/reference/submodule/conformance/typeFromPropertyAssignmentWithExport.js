//// [tests/cases/conformance/salsa/typeFromPropertyAssignmentWithExport.ts] ////

//// [a.js]
// this is a javascript file...

export const Adapter = {};

Adapter.prop = {};

// comment this out, and it works
Adapter.asyncMethod = function() {}

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adapter = void 0;
// this is a javascript file...
exports.Adapter = {};
exports.Adapter.prop = {};
// comment this out, and it works
exports.Adapter.asyncMethod = function () { };
