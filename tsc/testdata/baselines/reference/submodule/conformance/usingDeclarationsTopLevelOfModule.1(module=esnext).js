//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsTopLevelOfModule.1.ts] ////

//// [usingDeclarationsTopLevelOfModule.1.ts]
export const x = 1;
export { y };

using z = { [Symbol.dispose]() {} };

const y = 2;

export const w = 3;

export default 4;

console.log(w, x, y, z);


//// [usingDeclarationsTopLevelOfModule.1.js]
export const x = 1;
export { y };
using z = { [Symbol.dispose]() { } };
const y = 2;
export const w = 3;
export default 4;
console.log(w, x, y, z);
