// @allowJs: true
// @checkJs: true
// @noEmit: true
// @filename: /test.js

class Foo {
    constructor() {
        this.prop = {};
    }

    declare prop: string;

    method() {
        this.prop.foo
    }
}
