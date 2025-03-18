//// [tests/cases/conformance/es6/computedProperties/computedPropertyNamesContextualType2_ES5.ts] ////

//// [computedPropertyNamesContextualType2_ES5.ts]
interface I {
    [s: string]: (x: any) => number; // Doesn't get hit
    [s: number]: (x: string) => number;
}

var o: I = {
    [+"foo"](y) { return y.length; },
    [+"bar"]: y => y.length
}

//// [computedPropertyNamesContextualType2_ES5.js]
var o = {
    [+"foo"](y) { return y.length; },
    [+"bar"]: y => y.length
};
