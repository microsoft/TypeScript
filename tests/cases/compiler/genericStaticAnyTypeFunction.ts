class A {

    static one<T>(source: T, value: number): T {

        return source;

    }
    static goo() { return 0; }

    static two<T>(source: T): T {
        return this.one<T>(source, 42); // should not error

    }

}


