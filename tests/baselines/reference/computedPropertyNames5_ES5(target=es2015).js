//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames5_ES5.ts] ////

//// [computedPropertyNames5_ES5.ts]
declare var b: boolean;
var v = {
    [b]: 0,
    [true]: 1,
    [[]]: 0,
    [{}]: 0,
    [undefined]: undefined,
    [null]: null
}

//// [computedPropertyNames5_ES5.js]
"use strict";
var v = {
    [b]: 0,
    [true]: 1,
    [[]]: 0,
    [{}]: 0,
    [undefined]: undefined,
    [null]: null
};
