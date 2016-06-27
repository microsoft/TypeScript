//// [asyncFunctionDeclaration13_es5.ts]
async function foo(): Promise<void> {
   // Legal to use 'await' in a type context.
   var v: await;
}


//// [asyncFunctionDeclaration13_es5.js]
function foo() {
    return __awaiter(this, void 0, Promise, function () {
        var v;
        return __generator(function (_a) {
            return [2 /*return*/];
        });
    });
}
