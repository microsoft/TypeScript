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

verify.codeFixAll({
  fixId: "correctQualifiedNameToIndexedAccessType",
  fixAllDescription: "Rewrite all as indexed access types",
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