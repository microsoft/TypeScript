//// [tests/cases/compiler/unusedTypeParameters8.ts] ////

//// [a.ts]
class C<T> { }

//// [b.ts]
interface C<T> { }

//// [a.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
//// [b.js]
