// @target: es2015
// @strict: true
// @noEmit: true
// @noUnusedLocals: true
// @noUnusedParameters: true

function potentialPredicateUnusedParam(a: unknown) {
  return !!Math.random();
}
