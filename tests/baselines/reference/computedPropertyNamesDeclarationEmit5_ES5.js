//// [computedPropertyNamesDeclarationEmit5_ES5.ts]
var v = {
    ["" + ""]: 0,
    ["" + ""]() { },
    get ["" + ""]() { return 0; },
    set ["" + ""](x) { }
}

//// [computedPropertyNamesDeclarationEmit5_ES5.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var v = (_a = {},
    _a["" + ""] = 0,
    _a[_b = "" + ""] = function () { },
    Object.defineProperty(_a, "" + "", {
        get: function () { return 0; },
        enumerable: true,
        configurable: true
    }),
    Object.defineProperty(_a, "" + "", {
        set: function (x) { },
        enumerable: true,
        configurable: true
    }), __names(_a, [_b]),
    _a);
var _a, _b;


//// [computedPropertyNamesDeclarationEmit5_ES5.d.ts]
declare var v: {
    [x: string]: any;
};
