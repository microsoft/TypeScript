//// [genericCallWithObjectTypeArgsAndIndexersErrors.js]
// Type inference infers from indexers in target type, error cases
function foo(x) {
    return x;
}

function other(arg) {
    var b;
    var r2 = foo(b);
}

function other3(arg) {
    var b;
    var r2 = foo(b);
    var d = r2[1];
    var e = r2['1'];
    var u = r2[1];
}
