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
var None = /** @class */ (function () {
    function None() {
    }
    var None_prototype = None.prototype;
    None_prototype.get = function () {
        throw null;
    };
    None_prototype.flatten = function () {
        return new None();
    };
    return None;
}());
