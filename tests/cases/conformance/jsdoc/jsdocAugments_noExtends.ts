// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /b.js
class A { constructor() { this.x = 0; } }

/** @augments A */
class B {
    m() {
        return this.x;
    }
}
