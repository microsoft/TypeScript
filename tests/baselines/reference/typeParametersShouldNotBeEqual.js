//// [typeParametersShouldNotBeEqual.js]
function ff(x, y) {
    var z;
    x = x; // Ok
    x = y; // Error
    x = z; // Error
    z = x; // Ok
}
