// @declaration: true
// @allowJs: true
// @emitDeclarationOnly: true

// @filename: /a.js
class A {
	m() {
		/**
		 * @type object
		 */
		this.foo = arguments;
	}
}
