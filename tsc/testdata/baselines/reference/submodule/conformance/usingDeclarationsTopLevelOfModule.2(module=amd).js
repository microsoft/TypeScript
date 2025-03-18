//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsTopLevelOfModule.2.ts] ////

//// [usingDeclarationsTopLevelOfModule.2.ts]
using z = { [Symbol.dispose]() {} };

const y = 2;

console.log(y, z);
export = 4;


//// [usingDeclarationsTopLevelOfModule.2.js]
"use strict";
using z = { [Symbol.dispose]() { } };
const y = 2;
console.log(y, z);
module.exports = 4;
