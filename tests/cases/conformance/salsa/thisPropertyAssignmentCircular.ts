// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @filename: thisPropertyAssignmentCircular.js
export class Foo {
    constructor() {
        this.foo = "Hello";
    }
    slicey() {
        this.foo = this.foo.slice();
    }
    m() {
        this.foo
    }
}

/** @class */
function C() {
    this.x = 0;
    this.x = function() { this.x.toString(); }
}
