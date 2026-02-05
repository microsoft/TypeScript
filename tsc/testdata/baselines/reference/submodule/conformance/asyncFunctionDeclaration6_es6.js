//// [tests/cases/conformance/async/es6/functionDeclarations/asyncFunctionDeclaration6_es6.ts] ////

//// [asyncFunctionDeclaration6_es6.ts]
async function foo(a = await): Promise<void> {
}

//// [asyncFunctionDeclaration6_es6.js]
"use strict";
async function foo(a = await ) {
}
