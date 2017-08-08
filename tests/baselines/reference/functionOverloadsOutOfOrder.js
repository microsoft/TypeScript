//// [functionOverloadsOutOfOrder.ts]
class d {
    private foo(n: number): string;
    private foo(ns: any) {
        return ns.toString();
    }
    private foo(s: string): string;
}

class e {
    private foo(ns: any) {
        return ns.toString();
    }
    private foo(s: string): string;
    private foo(n: number): string;
}

//// [functionOverloadsOutOfOrder.js]
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
var d = (function () {
    function d() {
    }
    d.prototype.foo = function (ns) {
        return ns.toString();
    };
    __names(d.prototype, ["foo"]);
    return d;
}());
var e = (function () {
    function e() {
    }
    e.prototype.foo = function (ns) {
        return ns.toString();
    };
    __names(e.prototype, ["foo"]);
    return e;
}());
