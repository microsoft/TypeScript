//// [tests/cases/conformance/async/es5/functionDeclarations/asyncFunctionDeclaration13_es5.ts] ////

//// [asyncFunctionDeclaration13_es5.ts]
async function foo(): Promise<void> {
   // Legal to use 'await' in a type context.
   var v: await;
}


//// [asyncFunctionDeclaration13_es5.js]
async function foo() {
    // Legal to use 'await' in a type context.
    var v;
}
