//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName41.ts] ////

//// [parserComputedPropertyName41.ts]
var v = {
    [0 in []]: true
}

//// [parserComputedPropertyName41.js]
"use strict";
var v = {
    [0 in []]: true
};
