// @target: es5, es2015
// @downlevelIteration: true
// @lib: es2015
function* a() {
  for (const i of [1,2,3]) {
    (() => i)()
    yield i
  }
}