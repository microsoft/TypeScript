// @declaration: true
// @allowJs: true
// @emitDeclarationOnly: true

// @filename: /a.js
const bar = {
	arguments: {}
}

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
		this.foo = foo;

		/**
		 * @type object
		 */
		this.bar = bar.arguments;
	}
}
