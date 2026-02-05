//// [tests/cases/conformance/async/es6/functionDeclarations/asyncFunctionDeclaration10_es6.ts] ////

//// [asyncFunctionDeclaration10_es6.ts]
async function foo(a = await => await): Promise<void> {
}

//// [asyncFunctionDeclaration10_es6.js]
"use strict";
async function foo(a = await , await) {
}
