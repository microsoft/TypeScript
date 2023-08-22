//// [tests/cases/conformance/es6/computedProperties/computedPropertyNamesContextualType4_ES6.ts] ////

//// [computedPropertyNamesContextualType4_ES6.ts]
interface I {
    [s: string]: any;
    [s: number]: any;
}

var o: I = {
    [""+"foo"]: "",
    [""+"bar"]: 0
}

//// [computedPropertyNamesContextualType4_ES6.js]
var o = {
    ["" + "foo"]: "",
    ["" + "bar"]: 0
};
