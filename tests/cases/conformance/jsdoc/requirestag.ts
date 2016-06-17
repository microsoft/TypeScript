// @allowJs: true
// @filename: requirestag.js
// @out: dummy148.js
/**
 * @requires module:foo/helper
 */
function foo() {
}

/**
 * @requires foo
 * @requires Pez#blat this text is ignored
 */
function bar() {
}

/**
 * @requires {@link module:zest}
 * @requires {@linkplain module:zing}
 * @requires {@linkstupid module:pizzazz}
 */
function baz() {
}
