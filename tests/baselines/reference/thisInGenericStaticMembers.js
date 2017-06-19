//// [thisInGenericStaticMembers.ts]
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




//// [thisInGenericStaticMembers.js]
// this.call in static generic method not resolved correctly
var A = /** @class */ (function () {
    function A() {
    }
    A.one = function (source, value) {
        return source;
    };
    A.two = function (source) {
        return this.one(source, 42);
    };
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    B.one = function (source, value) {
        return source;
    };
    B.two = function (source) {
        return this.one(source, 42);
    };
    return B;
}());
