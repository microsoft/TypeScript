//// [tests/cases/compiler/intrinsics.ts] ////

//// [intrinsics.ts]
var hasOwnProperty: hasOwnProperty; // Error

module m1 {
    export var __proto__;
    interface __proto__ {}

    class C<T extends { __proto__: __proto__ }> { }
}

__proto__ = 0; // Error, __proto__ not defined
m1.__proto__ = 0;

class Foo<__proto__> { }
var foo: (__proto__: number) => void;

//// [intrinsics.js]
var hasOwnProperty; // Error
var m1;
(function (m1) {
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
})(m1 || (m1 = {}));
__proto__ = 0; // Error, __proto__ not defined
m1.__proto__ = 0;
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
var foo;


//// [intrinsics.d.ts]
declare var hasOwnProperty: hasOwnProperty;
declare namespace m1 {
    var __proto__: any;
}
declare class Foo<__proto__> {
}
declare var foo: (__proto__: number) => void;
