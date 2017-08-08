//// [recursiveInheritance3.ts]
class C implements I {
    public foo(x: any) { return x; }
    private x = 1;
}

interface I extends C {
    other(x: any): any;
}

//// [recursiveInheritance3.js]
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
var C = (function () {
    function C() {
        this.x = 1;
    }
    C.prototype.foo = function (x) { return x; };
    __names(C.prototype, ["foo"]);
    return C;
}());
