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
