// @target: ES5
// @lib: es5,es2015.promise
// @noEmitHelpers: true

var foo = async (): Promise<void> => {
   // Legal to use 'await' in a type context.
   var v: await;
}
