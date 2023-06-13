//// [tests/cases/conformance/async/es2017/functionDeclarations/asyncFunctionDeclaration5_es2017.ts] ////

//// [asyncFunctionDeclaration5_es2017.ts]
async function foo(await): Promise<void> {
}

//// [asyncFunctionDeclaration5_es2017.js]
async function foo(await) {
}
