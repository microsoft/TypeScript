//// [mismatchedGenericArguments1.ts]
interface IFoo<T> {
   foo<T>(x: T): T;
}
class C<T> implements IFoo<T> {
   foo(x: string): number {
     return null;
   }
}

class C2<T> implements IFoo<T> {
   foo<U>(x: string): number {
     return null;
   }
}


//// [mismatchedGenericArguments1.js]
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
    }
    C.prototype.foo = function (x) {
        return null;
    };
    __names(C.prototype, ["foo"]);
    return C;
}());
var C2 = (function () {
    function C2() {
    }
    C2.prototype.foo = function (x) {
        return null;
    };
    __names(C2.prototype, ["foo"]);
    return C2;
}());
