//// [tests/cases/compiler/restArgMissingName.ts] ////

//// [restArgMissingName.ts]
function sum (...) {} 


//// [restArgMissingName.js]
function sum() {
    var  = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        [_i] = arguments[_i];
    }
}
