//// [asyncFunctionDeclaration10_es6.ts]
async function foo(a = await => await): Promise<void> {
}

//// [asyncFunctionDeclaration10_es6.js]
function foo() {
    return __awaiter(function *(a = await => await) {
    }.apply(this, arguments), Promise);
}
