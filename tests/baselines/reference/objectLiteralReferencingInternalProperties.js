//// [tests/cases/compiler/objectLiteralReferencingInternalProperties.ts] ////

//// [objectLiteralReferencingInternalProperties.ts]
var a = { b: 10, c: b }; // Should give error for attempting to reference b.

//// [objectLiteralReferencingInternalProperties.js]
"use strict";
var a = { b: 10, c: b }; // Should give error for attempting to reference b.
