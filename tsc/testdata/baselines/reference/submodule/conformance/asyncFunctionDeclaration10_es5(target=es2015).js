//// [tests/cases/conformance/async/es5/functionDeclarations/asyncFunctionDeclaration10_es5.ts] ////

//// [asyncFunctionDeclaration10_es5.ts]
async function foo(a = await => await): Promise<void> {
}

//// [asyncFunctionDeclaration10_es5.js]
"use strict";
async function foo(a = await , await) {
}
