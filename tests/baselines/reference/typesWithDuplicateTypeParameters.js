//// [tests/cases/conformance/types/typeParameters/typeParameterLists/typesWithDuplicateTypeParameters.ts] ////

//// [typesWithDuplicateTypeParameters.ts]
class C<T, T> { }
class C2<T, U, T> { }

interface I<T, T> { }
interface I2<T, U, T> { }

function f<T, T>() { }
function f2<T, U, T>() { }

//// [typesWithDuplicateTypeParameters.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
function f() { }
function f2() { }
