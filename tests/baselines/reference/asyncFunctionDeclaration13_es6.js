//// [asyncFunctionDeclaration13_es6.ts]
async function foo(): Promise<void> {
   // Legal to use 'await' in a type context.
   var v: await;
}


//// [asyncFunctionDeclaration13_es6.js]
function foo() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(function* () {
            // Legal to use 'await' in a type context.
            var v;
        }()));
    });
}
