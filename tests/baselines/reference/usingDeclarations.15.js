//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarations.15.ts] ////

//// [usingDeclarations.15.ts]
export {};

using _ = { [Symbol.dispose]() {} };

//// [usingDeclarations.15.js]
using _ = { [Symbol.dispose]() { } };
export {};
