// @target: es2015
// @declaration: true
// @allowJs: true
// @emitDeclarationOnly: true

// @filename: /a.js
class A {
	constructor() {
		/**
		 * @type object
		 */
		this.foo = arguments;
	}
}
