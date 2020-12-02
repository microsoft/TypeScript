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
    var C_prototype = C.prototype;
    C_prototype["" + ""] = function () { };
    Object.defineProperty(C_prototype, "" + "", {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C_prototype, "" + "", {
        set: function (x) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());


//// [computedPropertyNamesDeclarationEmit1_ES5.d.ts]
declare class C {
}
