// @target: ES6
// @noEmitHelpers: true
async function foo(): Promise<void> {
   // Legal to use 'await' in a type context.
   var v: await;
}
