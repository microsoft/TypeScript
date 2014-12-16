//// [asyncFunctionDeclaration11_es6.ts]
async function await(): Promise<void> {
}

//// [asyncFunctionDeclaration11_es6.js]
function await() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(function* () {
        }()));
    });
}
