//// [inferSetterParamType.ts]
class Foo {

    get bar() {
        return 0;
    }
    set bar(n) { // should not be an error - infer number
    }
}

class Foo2 {

    get bar() {
        return 0; // should be an error - can't coerce infered return type to match setter annotated type
    }
    set bar(n:string) {
    }
}


//// [inferSetterParamType.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Object.defineProperty(Foo.prototype, "bar", {
        get: function () {
            return 0;
        },
        set: function (n) {
        },
        enumerable: false,
        configurable: true
    });
    return Foo;
}());
var Foo2 = /** @class */ (function () {
    function Foo2() {
    }
    Object.defineProperty(Foo2.prototype, "bar", {
        get: function () {
            return 0; // should be an error - can't coerce infered return type to match setter annotated type
        },
        set: function (n) {
        },
        enumerable: false,
        configurable: true
    });
    return Foo2;
}());
