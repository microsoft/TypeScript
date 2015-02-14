//// [asyncFunctionDeclaration10_es6.ts]
async function foo(a = await => await): Promise<void> {
}

//// [asyncFunctionDeclaration10_es6.js]
function foo(a = await => { return await; }) {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(function* () {
        }()));
    });
}
