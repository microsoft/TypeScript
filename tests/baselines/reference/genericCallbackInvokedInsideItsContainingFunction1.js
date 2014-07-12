//// [genericCallbackInvokedInsideItsContainingFunction1.js]
function foo(x, y, f) {
    var r1 = f(1);
    var r2 = f(1);
    var r3 = f(null);
    var r4 = f(null);

    var r11 = f(x);
    var r21 = f(x);
    var r31 = f(null);
    var r41 = f(null);

    var r12 = f(y);
    var r22 = f(y);
    var r32 = f(null);
    var r42 = f(null);
}
