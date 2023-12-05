//// [tests/cases/compiler/fatarrowfunctionsOptionalArgsErrors3.ts] ////

//// [fatarrowfunctionsOptionalArgsErrors3.ts]
(...) => 105;


//// [fatarrowfunctionsOptionalArgsErrors3.js]
(function () {
    var  = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        [_i] = arguments[_i];
    }
    return 105;
});
