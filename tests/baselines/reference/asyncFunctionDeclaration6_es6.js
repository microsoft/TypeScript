//// [asyncFunctionDeclaration6_es6.ts]
async function foo(a = await): Promise<void> {
}

//// [asyncFunctionDeclaration6_es6.js]
function foo() {
    return __awaiter(function *(a = await) {
    }.apply(this, arguments), Promise);
}
