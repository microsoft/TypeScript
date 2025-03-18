//// [tests/cases/conformance/declarationEmit/exportDefaultNamespace.ts] ////

//// [exportDefaultNamespace.ts]
export default function someFunc() {
    return 'hello!';
}

someFunc.someProp = 'yo';


//// [exportDefaultNamespace.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = someFunc;
function someFunc() {
    return 'hello!';
}
someFunc.someProp = 'yo';
