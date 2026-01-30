//// [tests/cases/conformance/es6/computedProperties/computedPropertyNamesContextualType3_ES5.ts] ////

//// [computedPropertyNamesContextualType3_ES5.ts]
interface I {
    [s: string]: (x: string) => number;
}

var o: I = {
    [+"foo"](y) { return y.length; },
    [+"bar"]: y => y.length
}

//// [computedPropertyNamesContextualType3_ES5.js]
var o = {
    [+"foo"](y) { return y.length; },
    [+"bar"]: y => y.length
};
