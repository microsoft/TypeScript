//// [tests/cases/conformance/async/es5/functionDeclarations/asyncFunctionDeclaration6_es5.ts] ////

//// [asyncFunctionDeclaration6_es5.ts]
async function foo(a = await): Promise<void> {
}

//// [asyncFunctionDeclaration6_es5.js]
async function foo(a = await ) {
}
