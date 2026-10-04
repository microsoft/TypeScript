// @target: es6
function * foo() {
   // Legal to use 'yield' in a type context.
   var v: yield;
}
