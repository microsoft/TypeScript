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
    var proto_1 = C.prototype;
    proto_1["" + ""] = function () { };
    Object.defineProperty(proto_1, "" + "", {
        get: function () { return 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto_1, "" + "", {
        set: function (x) { },
        enumerable: true,
        configurable: true
    });
    return C;
}());


//// [computedPropertyNamesDeclarationEmit1_ES5.d.ts]
declare class C {
}
