//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsTopLevelOfModule.2.ts] ////

//// [usingDeclarationsTopLevelOfModule.2.ts]
using z = { [Symbol.dispose]() {} };

const y = 2;

console.log(y, z);
export = 4;


//// [usingDeclarationsTopLevelOfModule.2.js]
"use strict";
var z, y, _default;
const env_1 = { stack: [], error: void 0, hasError: false };
try {
    z = __addDisposableResource(env_1, { [Symbol.dispose]() { } }, false);
    y = 2;
    console.log(y, z);
    _default = 4;
}
catch (e_1) {
    env_1.error = e_1;
    env_1.hasError = true;
}
finally {
    __disposeResources(env_1);
}
module.exports = _default;
