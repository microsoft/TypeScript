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
var A = /** @class */ (function () {
    function A() {
    }
    A.one = function (source, value) {
        return source;
    };
    A.goo = function () { return 0; };
    A.two = function (source) {
        return this.one(source, 42); // should not error
    };
    return A;
}());
