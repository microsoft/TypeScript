//// [tests/cases/conformance/async/es2017/functionDeclarations/asyncFunctionDeclaration13_es2017.ts] ////

//// [asyncFunctionDeclaration13_es2017.ts]
async function foo(): Promise<void> {
   // Legal to use 'await' in a type context.
   var v: await;
}


//// [asyncFunctionDeclaration13_es2017.js]
async function foo() {
    // Legal to use 'await' in a type context.
    var v;
}
