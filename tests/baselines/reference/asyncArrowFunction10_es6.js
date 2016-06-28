//// [asyncArrowFunction10_es6.ts]

var foo = async foo(): Promise<void> => {
   // Legal to use 'await' in a type context.
   var v: await;
}


//// [asyncArrowFunction10_es6.js]
var foo = async, foo = () => {
    // Legal to use 'await' in a type context.
    var v;
};
