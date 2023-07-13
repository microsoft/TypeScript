//// [tests/cases/compiler/typeParametersShouldNotBeEqual.ts] ////

//// [typeParametersShouldNotBeEqual.ts]
function ff<T, U>(x: T, y: U) {
    var z: Object;
    x = x;  // Ok
    x = y;  // Error
    x = z;  // Error
    z = x;  // Ok
}


//// [typeParametersShouldNotBeEqual.js]
function ff(x, y) {
    var z;
    x = x; // Ok
    x = y; // Error
    x = z; // Error
    z = x; // Ok
}
