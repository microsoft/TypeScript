//// [tests/cases/compiler/typeInferenceReturnTypeCallback.ts] ////

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
class Nil {
    map(f) {
        return null;
    }
}
class Cons {
    map(f) {
        return this.foldRight(new Nil(), (t, acc) => {
            return new Cons();
        });
    }
    foldRight(z, f) {
        return null;
    }
}
