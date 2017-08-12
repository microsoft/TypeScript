//// [genericInterfaceImplementation.ts]
interface IOption<A> {
    get(): A;

    flatten<B>(): IOption<B>;
}

class None<T> implements IOption<T>{
    get(): T {
        throw null;
    }

    flatten<U>() : IOption<U> {
        return new None<U>();
    }
}


//// [genericInterfaceImplementation.js]
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
var None = (function () {
    function None() {
    }
    None.prototype.get = function () {
        throw null;
    };
    None.prototype.flatten = function () {
        return new None();
    };
    __names(None.prototype, ["get", "flatten"]);
    return None;
}());
