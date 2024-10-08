//// [tests/cases/conformance/declarationEmit/exportDefaultNamespaceDeclaration.ts] ////

//// [exportDefaultNamespaceDeclaration.ts]
export default function someFunc() {
    return 'hello!';
}

someFunc.someProp = 'yo';


//// [exportDefaultNamespaceDeclaration.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = someFunc;
function someFunc() {
    return 'hello!';
}
someFunc.someProp = 'yo';


//// [exportDefaultNamespaceDeclaration.d.ts]
declare function someFunc(): string;
declare namespace someFunc {
    var someProp: string;
}
export default someFunc;
