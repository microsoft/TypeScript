//// [asyncFunctionDeclaration6_es6.ts]
async function foo(a = await): Promise<void> {
}

//// [asyncFunctionDeclaration6_es6.js]
function foo(a = await) {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(function* () {
        }()));
    });
}
