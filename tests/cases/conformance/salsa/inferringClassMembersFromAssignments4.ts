// @noEmit: true
// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @strictNullChecks: true
// @Filename: a.js
class Base {
    m() {
        this.p = 1
    }
}
class Derived extends Base {
    m() {
        // should be OK, and p should have type number | undefined from its base
        this.p = 1
    }
}
