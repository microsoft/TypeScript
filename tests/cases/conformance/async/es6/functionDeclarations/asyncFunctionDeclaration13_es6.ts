// @target: ES6
// @noHelpers: true
async function foo(): Promise<void> {
   // Legal to use 'await' in a type context.
   var v: await;
}
