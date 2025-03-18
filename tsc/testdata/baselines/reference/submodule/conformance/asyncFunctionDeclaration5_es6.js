//// [tests/cases/conformance/async/es6/functionDeclarations/asyncFunctionDeclaration5_es6.ts] ////

//// [asyncFunctionDeclaration5_es6.ts]
async function foo(await): Promise<void> {
}

//// [asyncFunctionDeclaration5_es6.js]
async function foo(await) {
}
