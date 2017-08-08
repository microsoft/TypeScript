//// [typeInferenceReturnTypeCallback.ts]
interface IList<A> {
    map<B>(f: (t: A) => B): IList<B>;
}

class Nil<C> implements IList<C>{
    map<D>(f: (t: C) => D): IList<D> {
        return null;
    }
}

class Cons<T> implements IList<T>{
    map<U>(f: (t: T) => U): IList<U> {
        return this.foldRight(new Nil<U>(), (t, acc) => {
            return new Cons<U>();
        });
    }

    foldRight<E>(z: E, f: (t: T, acc: E) => E): E {
        return null;
    }
}

//// [typeInferenceReturnTypeCallback.js]
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
var Nil = (function () {
    function Nil() {
    }
    Nil.prototype.map = function (f) {
        return null;
    };
    __names(Nil.prototype, ["map"]);
    return Nil;
}());
var Cons = (function () {
    function Cons() {
    }
    Cons.prototype.map = function (f) {
        return this.foldRight(new Nil(), function (t, acc) {
            return new Cons();
        });
    };
    Cons.prototype.foldRight = function (z, f) {
        return null;
    };
    __names(Cons.prototype, ["map", "foldRight"]);
    return Cons;
}());
