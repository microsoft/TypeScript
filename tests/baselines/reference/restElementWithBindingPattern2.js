//// [restElementWithBindingPattern2.ts]
var [...{0: a, b }] = [0, 1];

//// [restElementWithBindingPattern2.js]
var _a = [0, 1], { 0: a, b } = _a.slice(0);
