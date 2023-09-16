//// [tests/cases/conformance/declarationEmit/exportDefaultNamespace.ts] ////

//// [exportDefaultNamespace.ts]
export default function someFunc() {
    return 'hello!';
}

someFunc.someProp = 'yo';


//// [exportDefaultNamespace.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function someFunc() {
    return 'hello!';
}
exports.default = someFunc;
someFunc.someProp = 'yo';


//// [exportDefaultNamespace.d.ts]
declare function someFunc(): string;
declare namespace someFunc {
    var someProp: string;
}
export default someFunc;
