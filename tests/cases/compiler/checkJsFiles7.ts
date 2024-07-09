// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noImplicitAny: true
// @fileName: a.js
class C {
	constructor() {
		/** @type {boolean} */
		this.a = true;
		this.a = !!this.a;
	}
}