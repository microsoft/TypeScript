//// [tests/cases/conformance/es6/destructuring/restElementWithBindingPattern.ts] ////

//// [restElementWithBindingPattern.ts]
var [...[a, b]] = [0, 1];

//// [restElementWithBindingPattern.js]
var _a = [0, 1].slice(0), a = _a[0], b = _a[1];
