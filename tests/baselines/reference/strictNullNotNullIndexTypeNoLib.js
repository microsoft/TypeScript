//// [strictNullNotNullIndexTypeNoLib.ts]
type Readonly<T> = {readonly [K in keyof T]: T[K]}
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

class Test2<T extends A> {
    attrs: Readonly<T>;

    m() {
        return this.attrs.params!; // Return type should maintain relationship with `T` after being not-null-asserted, ideally
    }
}

//// [strictNullNotNullIndexTypeNoLib.js]
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
var Test2 = /** @class */ (function () {
    function Test2() {
    }
    Test2.prototype.m = function () {
        return this.attrs.params; // Return type should maintain relationship with `T` after being not-null-asserted, ideally
    };
    return Test2;
}());
