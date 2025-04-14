//// [tests/cases/compiler/recursiveInferenceBug.ts] ////

//// [recursiveInferenceBug.ts]
function f(x: number) {
    var z = f(x);
    return x;
}


var zz = {
    g: () =>{ },
    get f() { return "abc"; },
};


//// [recursiveInferenceBug.js]
function f(x) {
    var z = f(x);
    return x;
}
var zz = {
    g: function () { },
    get f() { return "abc"; },
};
