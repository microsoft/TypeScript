// @declaration: true
// @allowJs: true
// @emitDeclarationOnly: true

// @filename: /a.js
class A {
	/**
	 * Constructor
	 *
	 * @param {object} [foo={}]
	 */
	constructor(foo = {}) {
		/**
		 * @type object
		 */
		this.arguments = foo;
	}
}
