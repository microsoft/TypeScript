// @noEmit: true
// @allowJs: true
// @checkJs: true
// @strict: true
// @Filename: decls.d.ts
declare function factory(type: string): {};
// @Filename: a.js

/**
 * @param {string} first
 */
function concat(/* first, second, ... */) {
  var s = ''
  for (var i = 0, l = arguments.length; i < l; i++) {
    s += arguments[i]
  }
  return s
}

/**
 * @param {...string} strings
 */
function correct() {
    arguments
}

correct(1,2,3) // oh no
