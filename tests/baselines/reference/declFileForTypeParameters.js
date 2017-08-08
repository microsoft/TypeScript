//// [declFileForTypeParameters.ts]
class C<T> {
    x: T;
    foo(a: T): T {
        return this.x;
    }
}

//// [declFileForTypeParameters.js]
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
    C.prototype.foo = function (a) {
        return this.x;
    };
    __names(C.prototype, ["foo"]);
    return C;
}());


//// [declFileForTypeParameters.d.ts]
declare class C<T> {
    x: T;
    foo(a: T): T;
}
