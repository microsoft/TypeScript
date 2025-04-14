//// [tests/cases/conformance/async/es6/functionDeclarations/asyncFunctionDeclaration13_es6.ts] ////

//// [asyncFunctionDeclaration13_es6.ts]
async function foo(): Promise<void> {
   // Legal to use 'await' in a type context.
   var v: await;
}


//// [asyncFunctionDeclaration13_es6.js]
function foo() {
    return __awaiter(this, void 0, void 0, function* () {
        // Legal to use 'await' in a type context.
        var v;
    });
}
