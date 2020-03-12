//// [tests/cases/compiler/reExportGlobalDeclaration3.ts] ////

//// [file1.d.ts]
declare namespace NS1 {
    export var foo: number;
}

declare namespace NS2 {
    export var foo: number;
}

//// [file2.ts]
export {NS1, NS1 as NNS1};
export {NS2, NS2 as NNS2};
export {NS1 as NNNS1};
export {NS2 as NNNS2};

//// [file2.js]
"use strict";
exports.__esModule = true;
exports.NNNS2 = exports.NNNS1 = exports.NNS2 = exports.NS2 = exports.NNS1 = exports.NS1 = void 0;
