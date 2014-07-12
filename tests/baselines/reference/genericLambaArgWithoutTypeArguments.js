//// [genericLambaArgWithoutTypeArguments.js]
function foo(a) {
    return null;
}
foo(function (arg) {
    return arg.x;
});
