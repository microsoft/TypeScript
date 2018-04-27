// @noEmit: true
// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @strictNullChecks: true
// @Filename: a.js
class Base {
    constructor() {
        this.p = 1
    }
}
class Derived extends Base {
    m() {
        this.p = 1
    }
}
