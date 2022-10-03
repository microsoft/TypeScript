// this.call in static generic method not resolved correctly

class A {

    static one<T>(source:T, value: number): T {
        return source;
    }

    static two<T>(source: T): T {
        return this.one<T>(source, 42);
    }
}

class B {

    static one(source: B, value: number): B {
        return source;
    }

    static two(source: B): B {
        return this.one(source, 42);
    }
}


