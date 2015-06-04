//// [asyncFunctionDeclaration14_es6.ts]
async function foo(): Promise<void> {
  return;
}

//// [asyncFunctionDeclaration14_es6.js]
function foo() {
    return __awaiter(function* () {
        return;
    }, this, void 0, Promise);
}
