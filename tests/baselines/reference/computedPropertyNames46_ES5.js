//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames46_ES5.ts] ////

//// [computedPropertyNames46_ES5.ts]
var o = {
    ["" || 0]: 0
};

//// [computedPropertyNames46_ES5.js]
var _a;
var o = (_a = {},
    _a["" || 0] = 0,
    _a);
