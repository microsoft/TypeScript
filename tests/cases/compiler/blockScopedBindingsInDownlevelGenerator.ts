// @target: es5
// @downlevelIteration: true
// @lib: es2015
function* a() {
  for (const i of [1,2,3]) {
    (() => i)()
    yield i
  }
}