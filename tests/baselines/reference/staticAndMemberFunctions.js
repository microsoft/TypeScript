//// [staticAndMemberFunctions.ts]
class T {
    static x() { }
    public y() { }
}

//// [staticAndMemberFunctions.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
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
var T = (function () {
    function T() {
    }
    T.x = function () { };
    T.prototype.y = function () { };
    __names(T.prototype, ["y"]);
    return T;
}());
