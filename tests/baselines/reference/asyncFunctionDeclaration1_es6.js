//// [asyncFunctionDeclaration1_es6.ts]
async function foo(): Promise<void> {
}

//// [asyncFunctionDeclaration1_es6.js]
function foo() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(function* () {
        }()));
    });
}
