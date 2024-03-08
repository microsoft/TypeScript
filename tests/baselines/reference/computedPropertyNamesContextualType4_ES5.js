//// [tests/cases/conformance/es6/computedProperties/computedPropertyNamesContextualType4_ES5.ts] ////

//// [computedPropertyNamesContextualType4_ES5.ts]
interface I {
    [s: string]: any;
    [s: number]: any;
}

var o: I = {
    [""+"foo"]: "",
    [""+"bar"]: 0
}

//// [computedPropertyNamesContextualType4_ES5.js]
var _a;
var o = (_a = {},
    _a["" + "foo"] = "",
    _a["" + "bar"] = 0,
    _a);
