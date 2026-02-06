//// [tests/cases/conformance/statements/for-ofStatements/ES5For-of11.ts] ////

//// [ES5For-of11.ts]
var v;
for (v of []) { }

//// [ES5For-of11.js]
"use strict";
var v;
for (var _i = 0, _a = []; _i < _a.length; _i++) {
    v = _a[_i];
}
