//// [incrementOnTypeParameter.ts]
class C<T> {
    a: T;
    foo() {
        this.a++; 
        for (var i: T, j = 0; j < 10; i++) { 
        }
    }
}


//// [incrementOnTypeParameter.js]
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
    C.prototype.foo = function () {
        this.a++;
        for (var i, j = 0; j < 10; i++) {
        }
    };
    __names(C.prototype, ["foo"]);
    return C;
}());
