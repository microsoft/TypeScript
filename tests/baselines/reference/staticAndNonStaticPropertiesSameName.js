//// [staticAndNonStaticPropertiesSameName.ts]
class C {
    x: number;
    static x: number;

    f() { }
    static f() { }
}

//// [staticAndNonStaticPropertiesSameName.js]
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
    C.prototype.f = function () { };
    C.f = function () { };
    __names(C.prototype, ["f"]);
    return C;
}());
