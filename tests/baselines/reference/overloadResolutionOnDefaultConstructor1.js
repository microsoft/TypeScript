//// [overloadResolutionOnDefaultConstructor1.ts]
class Bar {
    public clone() {
        return new Bar(0);
    }
}

//// [overloadResolutionOnDefaultConstructor1.js]
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
var Bar = (function () {
    function Bar() {
    }
    Bar.prototype.clone = function () {
        return new Bar(0);
    };
    __names(Bar.prototype, ["clone"]);
    return Bar;
}());
