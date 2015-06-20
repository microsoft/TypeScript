// @target: ES6
// @noEmitHelpers: true
// @experimentalAsyncFunctions: true

var foo = async foo(): Promise<void> => {
   // Legal to use 'await' in a type context.
   var v: await;
}
