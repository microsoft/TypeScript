//// [computedPropertyNamesDeclarationEmit5_ES5.ts]
var v = {
    ["" + ""]: 0,
    ["" + ""]() { },
    get ["" + ""]() { return 0; },
    set ["" + ""](x) { }
}

//// [computedPropertyNamesDeclarationEmit5_ES5.js]
var _a;
var v = (_a = {},
    _a["" + ""] = 0,
    _a["" + ""] = function () { },
    Object.defineProperty(_a, "" + "", {
        get: function () { return 0; },
        enumerable: true,
        configurable: true
    }),
    Object.defineProperty(_a, "" + "", {
        set: function (x) { },
        enumerable: true,
        configurable: true
    }),
    _a);


//// [computedPropertyNamesDeclarationEmit5_ES5.d.ts]
declare var v: {
    [x: string]: any;
};
