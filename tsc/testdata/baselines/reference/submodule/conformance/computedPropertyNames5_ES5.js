//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames5_ES5.ts] ////

//// [computedPropertyNames5_ES5.ts]
var b: boolean;
var v = {
    [b]: 0,
    [true]: 1,
    [[]]: 0,
    [{}]: 0,
    [undefined]: undefined,
    [null]: null
}

//// [computedPropertyNames5_ES5.js]
var b;
var v = {
    [b]: 0,
    [true]: 1,
    [[]]: 0,
    [{}]: 0,
    [undefined]: undefined,
    [null]: null
};
