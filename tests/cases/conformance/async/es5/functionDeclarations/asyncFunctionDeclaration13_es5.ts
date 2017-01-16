// @target: ES5
// @lib: es5,es2015.promise
// @noEmitHelpers: true
async function foo(): Promise<void> {
   // Legal to use 'await' in a type context.
   var v: await;
}
