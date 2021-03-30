// @declaration: true
// @allowJs: true
// @emitDeclarationOnly: true

// @filename: /a.js
class A {
	constructor() {
		/**
		 * @type Function
		 */
		this.callee = arguments.callee;
	}
}
