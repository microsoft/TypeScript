//// [functionAndPropertyNameConflict.ts]
class C65 {
    public aaaaa() { }
    public get aaaaa() {
        return 1;
    }
}

//// [functionAndPropertyNameConflict.js]
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
var C65 = (function () {
    function C65() {
    }
    C65.prototype.aaaaa = function () { };
    Object.defineProperty(C65.prototype, "aaaaa", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    __names(C65.prototype, ["aaaaa"]);
    return C65;
}());
