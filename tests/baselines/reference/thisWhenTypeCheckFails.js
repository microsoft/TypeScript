//// [thisWhenTypeCheckFails.ts]
class c {
    public n() {
        var k = () => {
            var s: string = this.n();
        }
    }    
}


//// [thisWhenTypeCheckFails.js]
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
var c = (function () {
    function c() {
    }
    c.prototype.n = function () {
        var _this = this;
        var k = function () {
            var s = _this.n();
        };
    };
    __names(c.prototype, ["n"]);
    return c;
}());
