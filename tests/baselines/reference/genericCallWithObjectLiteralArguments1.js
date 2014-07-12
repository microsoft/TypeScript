//// [genericCallWithObjectLiteralArguments1.js]
function foo(n, m) {
    return m;
}
var x = foo({ x: 3, y: "" }, 4);

// these are all errors
var x2 = foo({ x: 3, y: "" }, 4);
var x3 = foo({ x: 3, y: "" }, 4);
var x4 = foo({ x: "", y: 4 }, "");
var x5 = foo({ x: "", y: 4 }, "");
