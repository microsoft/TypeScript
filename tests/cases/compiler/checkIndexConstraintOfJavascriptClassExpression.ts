// @Filename: weird.js
// @allowJs: true
// @out: foo.js
someFunction(function(BaseClass) {
	class Hello extends BaseClass {
		constructor() {
			this.foo = "bar";
		}
	}
});
