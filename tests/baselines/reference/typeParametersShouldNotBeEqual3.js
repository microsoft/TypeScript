//// [typeParametersShouldNotBeEqual3.js]
function ff(x, y) {
    var z;
    x = x; // Ok
    x = y; // Ok
    x = z; // Ok
    z = x; // Ok
}
