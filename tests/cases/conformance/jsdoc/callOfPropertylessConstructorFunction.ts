// @target: es2015
// @strict: false
// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: callOfPropertylessConstructorFunction.js
/**
 * @constructor
 */
function Dependency(j) {
  return j
}
Dependency({})
