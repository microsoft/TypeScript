//// [classExtendsInterfaceThatExtendsClassWithPrivates1.ts]
class C {
    public foo(x: any) { return x; }
    private x = 1;
}

interface I extends C {
    other(x: any): any;
}

class D2 implements I {
    public foo(x: any) { return x }
    private x = 3;
    other(x: any) { return x }
} 

//// [classExtendsInterfaceThatExtendsClassWithPrivates1.js]
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
        this.x = 1;
    }
    C.prototype.foo = function (x) { return x; };
    __names(C.prototype, ["foo"]);
    return C;
}());
var D2 = (function () {
    function D2() {
        this.x = 3;
    }
    D2.prototype.foo = function (x) { return x; };
    D2.prototype.other = function (x) { return x; };
    __names(D2.prototype, ["foo", "other"]);
    return D2;
}());
