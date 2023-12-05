//// [tests/cases/compiler/declarationEmitTupleRestSignatureLeadingVariadic.ts] ////

//// [declarationEmitTupleRestSignatureLeadingVariadic.ts]
const f = <TFirstArgs extends any[], TLastArg>(...args: [...TFirstArgs, TLastArg]): void => {};

//// [declarationEmitTupleRestSignatureLeadingVariadic.js]
var f = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
};


//// [declarationEmitTupleRestSignatureLeadingVariadic.d.ts]
declare const f: <TFirstArgs extends any[], TLastArg>(...args: [...TFirstArgs, TLastArg]) => void;
