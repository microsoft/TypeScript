//// [tests/cases/conformance/async/es2017/functionDeclarations/asyncFunctionDeclaration6_es2017.ts] ////

//// [asyncFunctionDeclaration6_es2017.ts]
async function foo(a = await): Promise<void> {
}

//// [asyncFunctionDeclaration6_es2017.js]
async function foo(a = await ) {
}
