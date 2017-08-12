//// [computedPropertyNamesDeclarationEmit1_ES5.ts]
class C {
    ["" + ""]() { }
    get ["" + ""]() { return 0; }
    set ["" + ""](x) { }
}

//// [computedPropertyNamesDeclarationEmit1_ES5.js]
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
var C = (function () {
    function C() {
    }
    C.prototype[_a = "" + ""] = function () { };
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
    __names(C.prototype, [_a]);
    return C;
    var _a;
}());


//// [computedPropertyNamesDeclarationEmit1_ES5.d.ts]
declare class C {
}
