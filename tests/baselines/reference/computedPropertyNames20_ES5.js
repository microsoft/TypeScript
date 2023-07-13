//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames20_ES5.ts] ////

//// [computedPropertyNames20_ES5.ts]
var obj = {
    [this.bar]: 0
}

//// [computedPropertyNames20_ES5.js]
var _a;
var obj = (_a = {},
    _a[this.bar] = 0,
    _a);
