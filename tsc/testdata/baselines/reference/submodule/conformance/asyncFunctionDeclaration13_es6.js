//// [tests/cases/conformance/async/es6/functionDeclarations/asyncFunctionDeclaration13_es6.ts] ////

//// [asyncFunctionDeclaration13_es6.ts]
async function foo(): Promise<void> {
   // Legal to use 'await' in a type context.
   var v: await;
}


//// [asyncFunctionDeclaration13_es6.js]
async function foo() {
    var v;
}
