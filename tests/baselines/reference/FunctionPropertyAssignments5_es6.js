//// [FunctionPropertyAssignments5_es6.ts]
var v = { *[foo()]() { } }

//// [FunctionPropertyAssignments5_es6.js]
var v = (_a = {}, _a[foo()] = function () { },
_a);
var _a;
