//// [tests/cases/conformance/async/es5/functionDeclarations/asyncFunctionDeclaration5_es5.ts] ////

//// [asyncFunctionDeclaration5_es5.ts]
async function foo(await): Promise<void> {
}

//// [asyncFunctionDeclaration5_es5.js]
"use strict";
async function foo(await) {
}
