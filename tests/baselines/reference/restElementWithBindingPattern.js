//// [restElementWithBindingPattern.ts]
var [...[a, b]] = [0, 1];

//// [restElementWithBindingPattern.js]
var _a = [0, 1], [a, b] = _a.slice(0);
