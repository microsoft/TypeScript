//// [tests/cases/compiler/genericStaticAnyTypeFunction.ts] ////

//// [genericStaticAnyTypeFunction.ts]
class A {

    static one<T>(source: T, value: number): T {

        return source;

    }
    static goo() { return 0; }

    static two<T>(source: T): T {
        return this.one<T>(source, 42); // should not error

    }

}




//// [genericStaticAnyTypeFunction.js]
class A {
    static one(source, value) {
        return source;
    }
    static goo() { return 0; }
    static two(source) {
        return this.one(source, 42);
    }
}
