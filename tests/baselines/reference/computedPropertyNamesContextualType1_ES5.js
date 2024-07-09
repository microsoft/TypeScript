//// [tests/cases/conformance/es6/computedProperties/computedPropertyNamesContextualType1_ES5.ts] ////

//// [computedPropertyNamesContextualType1_ES5.ts]
interface I {
    [s: string]: (x: string) => number;
    [s: number]: (x: any) => number; // Doesn't get hit
}

var o: I = {
    ["" + 0](y) { return y.length; },
    ["" + 1]: y => y.length
}

//// [computedPropertyNamesContextualType1_ES5.js]
var _a;
var o = (_a = {},
    _a["" + 0] = function (y) { return y.length; },
    _a["" + 1] = function (y) { return y.length; },
    _a);
