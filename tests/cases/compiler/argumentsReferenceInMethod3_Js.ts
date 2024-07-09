// @declaration: true
// @allowJs: true
// @emitDeclarationOnly: true

// @filename: /a.js
class A {
	get arguments() {
		return { bar: {} };
	}
}

class B extends A {
	/**
	 * @param {object} [foo={}]
	 */
	m(foo = {}) {
		/**
		 * @type object
		 */
		this.x = foo;

		/**
		 * @type object
		 */
		this.y = super.arguments.bar;
	}
}
