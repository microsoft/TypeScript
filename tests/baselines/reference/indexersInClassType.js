//// [indexersInClassType.ts]
class C {
    [x: number]: Date;
    [x: string]: Object;
    1: Date;
    'a': {}

    fn() {
        return this;
    }
}

var c = new C();
var r = c.fn();
var r2 = r[1];
var r3 = r.a



//// [indexersInClassType.js]
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
    C.prototype.fn = function () {
        return this;
    };
    __names(C.prototype, ["fn"]);
    return C;
}());
var c = new C();
var r = c.fn();
var r2 = r[1];
var r3 = r.a;
