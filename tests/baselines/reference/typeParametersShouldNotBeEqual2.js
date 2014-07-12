//// [typeParametersShouldNotBeEqual2.js]
function ff(x, y, z) {
    var zz;
    x = x; // Ok
    x = y; // Ok
    x = z; // Error
    z = x; // Error
    y = z; // Error
    z = y; // Error
    x = zz; // Error
    zz = x; // Ok
}
