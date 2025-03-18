//// [tests/cases/conformance/async/es2017/functionDeclarations/asyncFunctionDeclaration10_es2017.ts] ////

//// [asyncFunctionDeclaration10_es2017.ts]
async function foo(a = await => await): Promise<void> {
}

//// [asyncFunctionDeclaration10_es2017.js]
async function foo(a = await , await) {
}
