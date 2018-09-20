//// [varArgWithNoParamName.ts]
function t1(...) {}

//// [varArgWithNoParamName.js]
function t1() {
    var  = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        [_i] = arguments[_i];
    }
}
