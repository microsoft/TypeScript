//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/awaitUsingDeclarationsTopLevelOfModule.1.ts] ////

//// [awaitUsingDeclarationsTopLevelOfModule.1.ts]
export const x = 1;
export { y };

await using z = { async [Symbol.asyncDispose]() {} };

const y = 2;

export const w = 3;

export default 4;

console.log(w, x, y, z);


//// [awaitUsingDeclarationsTopLevelOfModule.1.js]
export const x = 1;
export { y };
await using z = { async [Symbol.asyncDispose]() { } };
const y = 2;
export const w = 3;
export default 4;
console.log(w, x, y, z);
