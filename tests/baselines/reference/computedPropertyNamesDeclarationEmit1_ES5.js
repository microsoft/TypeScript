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
    var proto_1 = C.prototype;
    proto_1["" + ""] = function () { };
    Object.defineProperty(proto_1, "" + "", {
        get: function () { return 0; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, "" + "", {
        set: function (x) { },
        enumerable: false,
        configurable: true
    });
    return C;
}());


//// [computedPropertyNamesDeclarationEmit1_ES5.d.ts]
declare class C {
}
