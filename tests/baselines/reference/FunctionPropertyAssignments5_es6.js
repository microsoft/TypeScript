//// [FunctionPropertyAssignments5_es6.ts]
var v = { *[foo()]() { } }

//// [FunctionPropertyAssignments5_es6.js]
var v = function () { }(_a = {}, _a[foo()] = , _a);
var _a;
