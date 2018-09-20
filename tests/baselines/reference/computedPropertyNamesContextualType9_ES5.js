//// [computedPropertyNamesContextualType9_ES5.ts]
interface I {
    [s: string]: boolean;
    [s: number]: boolean;
}

var o: I = {
    [+"foo"]: "",
    [+"bar"]: 0
}

//// [computedPropertyNamesContextualType9_ES5.js]
var _a;
var o = (_a = {},
    _a[+"foo"] = "",
    _a[+"bar"] = 0,
    _a);
