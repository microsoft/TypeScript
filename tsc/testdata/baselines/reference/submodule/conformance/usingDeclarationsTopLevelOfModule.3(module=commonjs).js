//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsTopLevelOfModule.3.ts] ////

//// [usingDeclarationsTopLevelOfModule.3.ts]
export { y };

using z = { [Symbol.dispose]() {} };

if (false) {
    var y = 1;
}

function f() {
    console.log(y, z);
}



//// [usingDeclarationsTopLevelOfModule.3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
using z = { [Symbol.dispose]() { } };
if (false) {
    var y = 1;
    exports.y = y;
}
function f() {
    console.log(y, z);
}
