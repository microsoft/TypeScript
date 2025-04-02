//// [tests/cases/conformance/async/es2017/asyncArrowFunction/asyncArrowFunction10_es2017.ts] ////

//// [asyncArrowFunction10_es2017.ts]
var foo = async (): Promise<void> => {
   // Legal to use 'await' in a type context.
   var v: await;
}


//// [asyncArrowFunction10_es2017.js]
var foo = async () => {
    // Legal to use 'await' in a type context.
    var v;
};
