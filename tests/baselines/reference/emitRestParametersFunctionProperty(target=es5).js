//// [tests/cases/conformance/es6/restParameters/emitRestParametersFunctionProperty.ts] ////

//// [emitRestParametersFunctionProperty.ts]
var obj: {
    func1: (...rest) => void
}

var obj2 = {
    func(...rest) { }
}

//// [emitRestParametersFunctionProperty.js]
"use strict";
var obj;
var obj2 = {
    func: function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
    }
};
