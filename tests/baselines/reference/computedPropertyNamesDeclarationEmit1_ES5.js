//// [computedPropertyNamesDeclarationEmit1_ES5.ts]
class C {
    ["" + ""]() { }
    get ["" + ""]() { return 0; }
    set ["" + ""](x) { }
}

//// [computedPropertyNamesDeclarationEmit1_ES5.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype["" + ""] = function () { };
    Object.defineProperty(C.prototype, "" + "", {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C.prototype, "" + "", {
        set: function (x) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());


//// [computedPropertyNamesDeclarationEmit1_ES5.d.ts]
declare class C {
}
