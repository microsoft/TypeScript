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
var Nil = /** @class */ (function () {
    function Nil() {
    }
    Nil.prototype.map = function (f) {
        return null;
    };
    return Nil;
}());
var Cons = /** @class */ (function () {
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
    return Cons;
}());
