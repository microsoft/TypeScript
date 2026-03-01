//// [tests/cases/conformance/salsa/plainJSTypeErrors.ts] ////

//// [plainJSTypeErrors.js]
// should error
if ({} === {}) {}

// should not error
if ({} == {}) {}


//// [plainJSTypeErrors.js]
"use strict";
// should error
if ({} === {}) { }
// should not error
if ({} == {}) { }
