//// [tests/cases/conformance/es6/computedProperties/computedPropertyNamesContextualType3_ES6.ts] ////

//// [computedPropertyNamesContextualType3_ES6.ts]
interface I {
    [s: string]: (x: string) => number;
}

var o: I = {
    [+"foo"](y) { return y.length; },
    [+"bar"]: y => y.length
}

//// [computedPropertyNamesContextualType3_ES6.js]
"use strict";
var o = {
    [+"foo"](y) { return y.length; },
    [+"bar"]: y => y.length
};
