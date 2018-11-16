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
    constructor() {
        super();
        // should be OK, and p should have type number from this assignment
        this.p = 1
    }
    test() {
        return this.p
    }
}
