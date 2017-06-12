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
var None = (function () {
    function None() {
    }
    var proto_1 = None.prototype;
    proto_1.get = function () {
        throw null;
    };
    proto_1.flatten = function () {
        return new None();
    };
    return None;
}());
