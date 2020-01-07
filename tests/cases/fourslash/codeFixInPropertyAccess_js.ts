/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true

// @Filename: /a.js
//// /**
////  * @typedef Foo
////  * @property foo
////  */

//// /**
////  * @param {Foo.foo} inst
////  */
//// function blah(inst) {
////   return false;
//// }

verify.codeFix({
  index: 0,
  description: ignoreInterpolations(ts.Diagnostics.Rewrite_as_the_indexed_access_type_0),
  newFileContent:
`/**
 * @typedef Foo
 * @property foo
 */
/**
 * @param {Foo["foo"]} inst
 */
function blah(inst) {
  return false;
}`,
});


/**
 * @typedef Foo
 * @property foo
 */

/**
 * @param {Foo.foo} inst
 */
function blah(inst) {
  return false;
}