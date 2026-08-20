//// [tests/cases/conformance/es6/destructuring/restElementWithBindingPattern.ts] ////

//// [restElementWithBindingPattern.ts]
var [...[a, b]] = [0, 1];

//// [restElementWithBindingPattern.js]
"use strict";
var [...[a, b]] = [0, 1];
