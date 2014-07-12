//// [typeArgumentsOnFunctionsWithNoTypeParameters.js]
function foo(f) {
    var r1 = f(1);
    var r2 = f(1);
    var r3 = f(null);
    var r4 = f(null);
}
