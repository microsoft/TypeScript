// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @filename: /a.js
class C {
    /**
     * @param {any} a
     */
    foo(a) {
        this.constructor = a;
    }
}
