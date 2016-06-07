//// [trailingCommasInFunctionParameter.ts]
function f1(x, y,) {
}

function f2() {
    return (x,) => {}
}

//// [trailingCommasInFunctionParameter.js]
function f1(x, y) {
}
function f2() {
    return function (x) { };
}
