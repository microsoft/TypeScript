//// [tests/cases/conformance/es6/destructuring/restElementWithBindingPattern2.ts] ////

//// [restElementWithBindingPattern2.ts]
var [...{0: a, b }] = [0, 1];

//// [restElementWithBindingPattern2.js]
"use strict";
var [...{ 0: a, b }] = [0, 1];
