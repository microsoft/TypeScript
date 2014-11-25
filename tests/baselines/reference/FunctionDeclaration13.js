//// [FunctionDeclaration13.ts]
function * foo() {
   // Legal to use 'yield' in a type context.
   var v: yield;
}


//// [FunctionDeclaration13.js]
function foo() {
    // Legal to use 'yield' in a type context.
    var v;
}
