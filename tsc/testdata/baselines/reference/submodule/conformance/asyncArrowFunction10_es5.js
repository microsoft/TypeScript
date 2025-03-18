//// [tests/cases/conformance/async/es5/asyncArrowFunction/asyncArrowFunction10_es5.ts] ////

//// [asyncArrowFunction10_es5.ts]
var foo = async (): Promise<void> => {
   // Legal to use 'await' in a type context.
   var v: await;
}


//// [asyncArrowFunction10_es5.js]
var foo = async () => {
    var v;
};
