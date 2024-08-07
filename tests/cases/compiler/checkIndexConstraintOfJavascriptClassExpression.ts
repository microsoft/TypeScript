// @Filename: weird.js
// @allowJs: true
// @checkJs: true
// @strict: true
// @noEmit: true
// @outFile: foo.js
someFunction(function(BaseClass) {
    'use strict';
    const DEFAULT_MESSAGE = "nop!";
    class Hello extends BaseClass {
        constructor() {
            super();
            this.foo = "bar";
        }
        _render(error) {
            const message = error.message || DEFAULT_MESSAGE;
        }
    }
});
