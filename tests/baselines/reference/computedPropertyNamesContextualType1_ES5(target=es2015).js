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
var o = {
    ["" + 0](y) { return y.length; },
    ["" + 1]: y => y.length
};
