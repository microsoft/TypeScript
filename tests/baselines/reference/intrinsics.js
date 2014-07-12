//// [intrinsics.js]
var hasOwnProperty;

var m1;
(function (m1) {
    m1.__proto__;

    var C = (function () {
        function C() {
        }
        return C;
    })();
})(m1 || (m1 = {}));

__proto__ = 0; // Error, __proto__ not defined
m1.__proto__ = 0;

var Foo = (function () {
    function Foo() {
    }
    return Foo;
})();
var foo;


////[intrinsics.d.ts]
declare var hasOwnProperty: any;
declare module m1 {
    var __proto__: any;
}
declare class Foo<__proto__> {
}
declare var foo: (__proto__: number) => void;
