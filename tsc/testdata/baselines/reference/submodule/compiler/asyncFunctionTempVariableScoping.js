//// [tests/cases/compiler/asyncFunctionTempVariableScoping.ts] ////

//// [asyncFunctionTempVariableScoping.ts]
// https://github.com/Microsoft/TypeScript/issues/19187

async ({ foo, bar, ...rest }) => bar(await foo);

//// [asyncFunctionTempVariableScoping.js]
async ({ foo, bar, ...rest }) => bar(await foo);
