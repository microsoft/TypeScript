//// [indexerReturningTypeParameter1.ts]
interface f {
    groupBy<T>(): { [key: string]: T[]; };
}
var a: f;
var r = a.groupBy();

class c {
    groupBy<T>(): { [key: string]: T[]; } {
        return null;
    }
}
var a2: c;
var r2 = a2.groupBy();

//// [indexerReturningTypeParameter1.js]
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
var a;
var r = a.groupBy();
var c = (function () {
    function c() {
    }
    c.prototype.groupBy = function () {
        return null;
    };
    __names(c.prototype, ["groupBy"]);
    return c;
}());
var a2;
var r2 = a2.groupBy();
