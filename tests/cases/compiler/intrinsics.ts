// @declaration: true

var hasOwnProperty: hasOwnProperty; // Error

namespace m1 {
    export var __proto__;
    interface __proto__ {}

    class C<T extends { __proto__: __proto__ }> { }
}

__proto__ = 0; // Error, __proto__ not defined
m1.__proto__ = 0;

class Foo<__proto__> { }
var foo: (__proto__: number) => void;