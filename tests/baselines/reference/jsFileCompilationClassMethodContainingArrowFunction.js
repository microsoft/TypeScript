//// [a.js]
class c {
    method(a) {
        let x = a => this.method(a);
    }
}

//// [out.js]
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
var c = (function () {
    function c() {
    }
    c.prototype.method = function (a) {
        var _this = this;
        var x = function (a) { return _this.method(a); };
    };
    __names(c.prototype, ["method"]);
    return c;
}());
