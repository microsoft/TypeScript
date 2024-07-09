//// [tests/cases/conformance/salsa/plainJSTypeErrors.ts] ////

//// [plainJSTypeErrors.js]
// should error
if ({} === {}) {}

// should not error
if ({} == {}) {}


//// [plainJSTypeErrors.js]
// should error
if ({} === {}) { }
// should not error
if ({} == {}) { }
