//// [tests/cases/conformance/es6/restParameters/emitRestParametersFunctionPropertyES6.ts] ////

//// [emitRestParametersFunctionPropertyES6.ts]
var obj: {
    func1: (...rest) => void
}

var obj2 = {
    func(...rest) { }
}

//// [emitRestParametersFunctionPropertyES6.js]
"use strict";
var obj;
var obj2 = {
    func(...rest) { }
};
