//// [varInFunctionInVarInitializer.ts]
var a = function () {
    var c = 1;
    return c;
},
    b = 1;

//// [varInFunctionInVarInitializer.js]
var a = function () {
    var c = 1;
    return c;
}, b = 1;
