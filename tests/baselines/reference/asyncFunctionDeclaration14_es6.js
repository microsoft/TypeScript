//// [asyncFunctionDeclaration14_es6.ts]
async function foo(): Promise<void> {
  return;
}

//// [asyncFunctionDeclaration14_es6.js]
function foo() {
    return __awaiter(this, void 0, void 0, function* () {
        return;
    });
}
