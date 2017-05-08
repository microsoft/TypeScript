// @Filename: weird.js
// @allowJs: true
// @checkJs: true
// @strict: true
// @noEmit: true
// @out: foo.js
someFunction(function(BaseClass) {
        'use strict';
	class Hello extends BaseClass {
                const DEFAULT_MESSAGE = "nop!";
		constructor() {
			this.foo = "bar";
		}
                _render(error) {
                    const message = error.message || DEFAULT_MESSAGE;
                }
	}
});
