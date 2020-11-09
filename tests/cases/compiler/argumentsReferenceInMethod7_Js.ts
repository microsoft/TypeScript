// @declaration: true
// @allowJs: true
// @emitDeclarationOnly: true

// @filename: /a.js
class A {
	m() {
		/**
		 * @type Function
		 */
		this.callee = arguments.callee;
	}
}
