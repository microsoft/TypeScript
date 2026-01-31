//// [tests/cases/conformance/es6/computedProperties/computedPropertyNamesDeclarationEmit2_ES5.ts] ////

//// [computedPropertyNamesDeclarationEmit2_ES5.ts]
class C {
    static ["" + ""]() { }
    static get ["" + ""]() { return 0; }
    static set ["" + ""](x) { }
}

//// [computedPropertyNamesDeclarationEmit2_ES5.js]
var C = /** @class */ (function () {
    function C() {
    }
    C["" + ""] = function () { };
    Object.defineProperty(C, "" + "", {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(C, "" + "", {
        set: function (x) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());


//// [computedPropertyNamesDeclarationEmit2_ES5.d.ts]
declare class C {
}
