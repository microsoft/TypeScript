//// [wideningTuples6.ts]
var [a, b] = [undefined, null];
a = "";
b = "";

//// [wideningTuples6.js]
var _a = [undefined, null], a = _a[0], b = _a[1];
a = "";
b = "";
