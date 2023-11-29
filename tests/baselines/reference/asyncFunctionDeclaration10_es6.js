//// [tests/cases/conformance/async/es6/functionDeclarations/asyncFunctionDeclaration10_es6.ts] ////

//// [asyncFunctionDeclaration10_es6.ts]
async function foo(a = await => await): Promise<void> {
}

//// [asyncFunctionDeclaration10_es6.js]
function foo() {
    return __awaiter(this, arguments, void 0, function* (a = yield , await) {
    });
}
