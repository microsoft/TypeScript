// @target: ES5
// @lib: es5,es2015.promise
// @noEmitHelpers: true

var bar = async (): Promise<void> => {
  // 'await' here is an identifier, and not an await expression.
  var foo = async (a = await): Promise<void> => {
  }
}