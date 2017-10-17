//// [strictNullNotNullIndexTypeShouldWork.ts]
interface A {
    params?: { name: string; };
}

class Test<T extends A> {
    attrs: Readonly<T>;

    m() {
        this.attrs.params!.name;
    }
}

interface Foo {
    foo?: number;
}
  
class FooClass<P extends Foo = Foo> {
    properties: Readonly<P>;

    foo(): number {
        const { foo = 42 } = this.properties;
        return foo;
    }
}

//// [strictNullNotNullIndexTypeShouldWork.js]
var Test = /** @class */ (function () {
    function Test() {
    }
    Test.prototype.m = function () {
        this.attrs.params.name;
    };
    return Test;
}());
var FooClass = /** @class */ (function () {
    function FooClass() {
    }
    FooClass.prototype.foo = function () {
        var _a = this.properties.foo, foo = _a === void 0 ? 42 : _a;
        return foo;
    };
    return FooClass;
}());
