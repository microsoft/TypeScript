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
var Foo = (function () {
    function Foo() {
    }
    var proto_1 = Foo.prototype;
    Object.defineProperty(proto_1, "bar", {
        get: function () {
            return 0;
        },
        set: function (n) {
        },
        enumerable: true,
        configurable: true
    });
    return Foo;
}());
var Foo2 = (function () {
    function Foo2() {
    }
    var proto_2 = Foo2.prototype;
    Object.defineProperty(proto_2, "bar", {
        get: function () {
            return 0; // should be an error - can't coerce infered return type to match setter annotated type
        },
        set: function (n) {
        },
        enumerable: true,
        configurable: true
    });
    return Foo2;
}());
