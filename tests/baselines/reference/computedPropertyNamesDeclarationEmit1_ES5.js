//// [computedPropertyNamesDeclarationEmit1_ES5.ts]
class C {
    ["" + ""]() { }
    get ["" + ""]() { return 0; }
    set ["" + ""](x) { }
}

//// [computedPropertyNamesDeclarationEmit1_ES5.js]
var C = (function () {
    function C() {
    }
    C.prototype["" + ""] = function () { };
    Object.defineProperty(C.prototype, "" + "", {
        get: function () { return 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C.prototype, "" + "", {
        set: function (x) { },
        enumerable: true,
        configurable: true
    });
    return C;
}());


//// [computedPropertyNamesDeclarationEmit1_ES5.d.ts]
declare class C {
}
