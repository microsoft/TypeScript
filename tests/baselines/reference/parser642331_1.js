//// [tests/cases/conformance/parser/ecmascript5/RegressionTests/parser642331_1.ts] ////

//// [parser642331_1.ts]
"use strict";

class test {
    constructor (static) { }
}


//// [parser642331_1.js]
"use strict";
var test = /** @class */ (function () {
    function test(static) {
    }
    return test;
}());
