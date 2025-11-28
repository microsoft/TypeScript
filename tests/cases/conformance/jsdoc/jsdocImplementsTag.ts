// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /a.js
/**
 * @typedef { { foo: string } } A
 */

/**
 * @implements { A }
 */
class B {
    foo = ''
}
