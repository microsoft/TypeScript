//// [tests/cases/compiler/unusedTypeParameters7.ts] ////

//// [a.ts]
class C<T> { a: T; }

//// [b.ts]
interface C<T> { }

//// [a.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
//// [b.js]
