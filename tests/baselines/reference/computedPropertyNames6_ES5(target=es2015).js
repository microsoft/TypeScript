//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames6_ES5.ts] ////

//// [computedPropertyNames6_ES5.ts]
declare var p1: number | string;
declare var p2: number | number[];
declare var p3: string | boolean;
var v = {
    [p1]: 0,
    [p2]: 1,
    [p3]: 2
}

//// [computedPropertyNames6_ES5.js]
"use strict";
var v = {
    [p1]: 0,
    [p2]: 1,
    [p3]: 2
};
