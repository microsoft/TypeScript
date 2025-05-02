//// [tests/cases/conformance/parser/ecmascript5/ParameterLists/parserParameterList11.ts] ////

//// [parserParameterList11.ts]
(...arg?) => 102;

//// [parserParameterList11.js]
(function () {
    var arg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arg[_i] = arguments[_i];
    }
    return 102;
});
