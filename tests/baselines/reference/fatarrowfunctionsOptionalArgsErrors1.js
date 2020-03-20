//// [fatarrowfunctionsOptionalArgsErrors1.ts]
(arg1?, arg2) => 101;
(...arg?) => 102;
(...arg) => 103;
(...arg:number [] = []) => 104;

// Uninitialized parameter makes the initialized one required
(arg1 = 1, arg2) => 1; 

//// [fatarrowfunctionsOptionalArgsErrors1.js]
(function (arg1, arg2) { return 101; });
(function () {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    return 102;
});
(function () {
    var arg = [];
    for (var _a = 0; _a < arguments.length; _a++) {
        arg[_a] = arguments[_a];
    }
    return 103;
});
(function () {
    var arg = [];
    for (var _b = 0; _b < arguments.length; _b++) {
        arg[_b] = arguments[_b];
    }
    return 104;
});
// Uninitialized parameter makes the initialized one required
(function (arg1, arg2) {
    if (arg1 === void 0) { arg1 = 1; }
    return 1;
});
