//// [tests/cases/conformance/statements/for-ofStatements/ES5For-of4.ts] ////

//// [ES5For-of4.ts]
for (var v of [])
    var x = v;
var y = v;

//// [ES5For-of4.js]
"use strict";
for (var v of [])
    var x = v;
var y = v;
