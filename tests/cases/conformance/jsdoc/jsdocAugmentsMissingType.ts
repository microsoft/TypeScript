// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /a.js
class A { constructor() { this.x = 0; } }
/** @augments */
class B extends A {
    m() {
        this.x
    }
}
