//// [tests/cases/compiler/genericInterfaceImplementation.ts] ////

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
class None {
    get() {
        throw null;
    }
    flatten() {
        return new None();
    }
}
