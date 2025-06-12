//// [tests/cases/conformance/types/typeParameters/typeParameterLists/typesWithDuplicateTypeParameters.ts] ////

//// [typesWithDuplicateTypeParameters.ts]
class C<T, T> { }
class C2<T, U, T> { }

interface I<T, T> { }
interface I2<T, U, T> { }

function f<T, T>() { }
function f2<T, U, T>() { }

//// [typesWithDuplicateTypeParameters.js]
class C {
}
class C2 {
}
function f() { }
function f2() { }
