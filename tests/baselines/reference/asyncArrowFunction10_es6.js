//// [asyncArrowFunction10_es6.ts]
var foo = async (): Promise<void> => {
   // Legal to use 'await' in a type context.
   var v: await;
}


//// [asyncArrowFunction10_es6.js]
var foo = () => __awaiter(this, void 0, void 0, function* () {
    // Legal to use 'await' in a type context.
    var v;
});
