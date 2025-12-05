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
function f() {
    console.log(y, z);
}
var z;
const env_1 = { stack: [], error: void 0, hasError: false };
try {
    z = __addDisposableResource(env_1, { [Symbol.dispose]() { } }, false);
    if (false) {
        var y = 1;
        exports.y = y;
    }
}
catch (e_1) {
    env_1.error = e_1;
    env_1.hasError = true;
}
finally {
    __disposeResources(env_1);
}
