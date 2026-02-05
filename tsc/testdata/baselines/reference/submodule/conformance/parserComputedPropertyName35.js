//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName35.ts] ////

//// [parserComputedPropertyName35.ts]
var x = {
    [0, 1]: { }
}

//// [parserComputedPropertyName35.js]
"use strict";
var x = {
    [(0, 1)]: {}
};
